# Client requirements form: setup

The form at `/ihtiyac-formu` sends each submission to a small Google Apps
Script that lives inside a Google Sheet. The script adds the answers as a new
row and emails them to info@efka-consulting.com. Mail goes out through your
Google Workspace account, so there are no SMTP settings or mail passwords.

Cloudflare Turnstile, a free bot check, makes sure every submission comes from
a real visitor on efka-consulting.com: the script asks Cloudflare to confirm
each one before saving it.

You do steps 1 to 5 once, in Google and Cloudflare. Step 6 connects the website.

## 1. Create the spreadsheet

1. Sign in to Google with the Workspace account the emails should come from.
2. Create a new Google Sheet, for example "EFKA Müşteri İhtiyaç Formu".

Leave it empty. On the first run the script renames the empty first tab to
**Yanıtlar** and writes the header row itself, from the questions on the
website.

## 2. Add the script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete everything in the editor and paste in the whole of
   [`apps-script.gs`](./apps-script.gs).
3. Click the save icon. You can name the project "EFKA client form".

The email address and tab name are at the top of the script (`NOTIFY_TO`,
`SHEET_NAME`) if you ever want to change them.

## 3. Create the Turnstile keys

1. Sign in to the Cloudflare dashboard (the account that hosts the website) and
   open **Turnstile** from the left sidebar.
2. Click **Add widget** and set:
   - **Widget name:** EFKA client form
   - **Hostnames:** `efka-consulting.com` (add any other hostname the form will
     be opened on, such as a preview URL)
   - **Widget mode:** Managed
   - **Pre-clearance:** No
3. Click **Create**. Cloudflare shows a **Site Key** and a **Secret Key**. Keep
   the page open.

The **Secret Key** goes into the script, never into the website:

1. In the Apps Script editor, click **Project Settings** (the gear in the left
   sidebar).
2. Scroll to **Script Properties**, click **Add script property**, and enter:
   - **Property:** `TURNSTILE_SECRET`
   - **Value:** the Secret Key
3. Click **Save script properties**.

The **Site Key** goes into the website in step 6.

## 4. Run the test once

1. In the function menu next to **Run**, choose `testSetup`, then click **Run**.
2. Google asks for permission. Choose your account. If you see "Google hasn't
   verified this app", click **Advanced**, then **Go to EFKA client form**. It
   is your own script, so this warning is expected.
3. Allow access. The script needs to edit this spreadsheet, send email
   through your Gmail, and connect to an external service (Cloudflare, to
   check the bot test).

Check three things:

- The sheet has a **Yanıtlar** tab with a header row and one row reading
  "TEST: delete this row". Delete that row (keep the header). The log at the
  bottom of the editor says which spreadsheet, tab and row it wrote to.
- info@efka-consulting.com received "Müşteri ihtiyaç formu: TEST: delete this
  row", with the answers as a PDF on EFKA letterhead attached. (The client's
  thank-you, "Formunuz bize ulaştı", is only sent to the address a client types
  into the form, so `testSetup` does not send it.)
- The log ends with "Turnstile: secret key accepted by Cloudflare." If it says
  the secret is not set or not recognised, redo the Script Properties part of
  step 3.

If something is missing, open **Executions** in the left sidebar of the Apps
Script editor to see the error.

## 5. Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** and copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy…/exec`.

"Anyone" is required because the people filling in the form are not signed in
to your Workspace. They can only send answers to the script; they cannot see
the sheet. If "Anyone" is not offered, your Workspace admin has restricted
sharing outside the organisation: in the Admin console, go to
**Apps → Google Workspace → Drive and Docs → Sharing settings** and allow
sharing outside the domain (or ask your admin to).

To check the deployment, open the URL in a browser. It should say
"EFKA client form endpoint is running."

## 6. Connect the website

Paste the web app URL and the Turnstile **Site Key** into
`src/data/clientForm.ts`, each in place of its empty string:

```ts
export const CLIENT_FORM_ENDPOINT: string =
  import.meta.env.PUBLIC_CLIENT_FORM_ENDPOINT || 'https://script.google.com/macros/s/AKfy…/exec';

export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAA…';
```

Then build and deploy the site as usual. Both values are visible in the page
source, which is fine: the URL only accepts submissions, and the site key only
works on the hostnames you gave Cloudflare.

Once the site is live, submit the form once yourself from efka-consulting.com.

**Testing on your own computer:** a copy of the form on `localhost` cannot
send to the live script. The real site key issues no tokens there, and the
script only accepts tokens issued on `ALLOWED_HOSTNAMES`. Do not add
`localhost` to either: anyone can serve a page on their own `localhost`, so
that would let them obtain tokens and post to the script.

To test locally, use a separate test spreadsheet with its own copy of the
script. (Script Properties belong to the whole script project, so a second
deployment of the live script would share its real secret.) In the test copy,
set `TURNSTILE_SECRET` to Cloudflare's always-passing test secret
`1x0000000000000000000000000000000AA` and deploy it. Then build the site with
`PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA` and
`PUBLIC_CLIENT_FORM_ENDPOINT` set to the test copy's `/exec` URL.

## Changing the script later

Editing the script does not change what the live URL runs. After an edit, go to
**Deploy → Manage deployments**, click the pencil on the existing deployment,
set **Version** to **New version** and click **Deploy**. The URL stays the same.
(Choosing "New deployment" instead gives you a new URL, which the website would
then need.)

## Good to know

- **Adding a question:** add it to `src/data/clientForm.ts` and redeploy the
  site. The script adds a new column for it on the next submission. No script
  change is needed.
- **Your own columns:** you can add columns such as "Status" or "Notes" to the
  right of the form's columns; the script leaves them alone. Do not edit the
  notes on the header cells: the script uses them to match answers to columns.
- **The PDF:** each email carries the submission as a PDF on EFKA letterhead.
  The logo is `letterhead-logo.png`, embedded at the end of the script as
  `LOGO_PNG`.
- **Confirmation to the client:** when the client gives an email address,
  they get a short thank-you in Turkish and English. It does not repeat their
  answers, because anyone can type any address into the form. Set
  `SEND_CONFIRMATION` to `false` at the top of the script to turn it off.
- **Replying:** if the client gave an email address, replying to the
  notification email goes straight to them.
- **Limits:** each submission sends two emails (the notification and the
  client's thank-you). New and trial Workspace accounts can send about 100
  emails a day from scripts, rising with the account's age and plan.
- **Sender address:** emails come from donotreply@efka-consulting.com
  (`SEND_FROM`) once the account the web app runs as may send as that
  address. Add `donotreply` as an alternate email of that user in the Admin
  console (**Directory → Users → user → User information**), then add it in
  the user's Gmail under **Settings → Accounts → Send mail as**. Until then
  emails come from the account itself; `testSetup` says which address is used.
  Replies go to info@ (the thank-you's reply-to) or to the client (the
  notification's reply-to). Google does not let a script send from any other
  address.
- **Email to outside addresses:** the domain needs SPF and DKIM records
  (see the Google Admin console under **Apps → Google Workspace → Gmail →
  Authenticate email**), or Gmail rejects the client's thank-you. Delivery of
  each email can be checked in the Admin console under **Reporting → Email log
  search**.
- **Spam and forged requests:** every submission needs a Turnstile token that
  Cloudflare issued on efka-consulting.com, so the script URL is useless
  without the website. The script also accepts at most 30 submissions an hour
  (`MAX_PER_HOUR`).
- **What happened to a submission:** every submission is logged under
  **Executions** in the Apps Script editor: where it was saved, whether the
  notification and the thank-you went out, or why it was refused. A refused
  submission shows the client the "please email us" message; nothing is
  dropped silently.
- **If the form stops accepting submissions:** check **Executions**. "Turnstile
  rejected the submission" with "TURNSTILE_SECRET is not set" means the script
  property is missing; "token issued on …" means the form was opened on a
  hostname that is not in `ALLOWED_HOSTNAMES` at the top of the script.
