# 📬 MailMind

**MailMind** is an AI-powered email management platform that boosts productivity by helping users categorize, summarize, and organize their emails efficiently. Built with modern technologies, MailMind offers intelligent automation features to streamline your inbox workflow.

![GitHub Repo Stars](https://img.shields.io/github/stars/DinithaFdo/mailmind?style=social)
![GitHub Last Commit](https://img.shields.io/github/last-commit/DinithaFdo/mailmind)
![License](https://img.shields.io/github/license/DinithaFdo/mailmind)

---

## 🚀 Features

- 🔍 **Automatic Email Categorization** – Organizes emails based on content & context.
- ⚡ **Urgent Email Highlighting** – Instantly draws attention to critical messages.
- 🧠 **AI-Powered Summarization** – Summarize long emails for faster reading.
- 🗂️ **Summarization History**
  - Save email summaries with a custom title and tags.
  - Edit, update, or delete past summaries.
  - Reuse summaries directly in the email compose window.
- 🔔 **Reminders** – Get notified about follow-ups and unreplied emails.
- 💬 **Email Composition with Saved Summaries** – Insert summaries using shortcuts.
- 🔐 **Authentication with Clerk** – Secure, passwordless login/signup.
- 🧾 **Stripe Integration (Coming Soon)** – For monetization and premium features.

---

## 🧰 Tech Stack

**Frontend:**

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)

**Backend & Integrations:**

- [MongoDB](https://www.mongodb.com/) – Cloud NoSQL database
- [Clerk](https://clerk.dev/) – Authentication system
- [Aurinco](https://aurincotech.com/) – Email fetching & sending
- [Orama](https://oramasearch.com/) – Fast email search engine
- [Stripe](https://stripe.com/) – (Optional) Subscription-based billing

---

## 🧑‍💻 Team & Roles

| Team Member                  | GitHub Username                  | Feature                           | Branch Name                         |
|-----------------------------|----------------------------------|-----------------------------------|-------------------------------------|
| Gagana Ushan                | [@GaganaUshan](https://github.com/GaganaUshan)           | Email Categories Management       | `feature/email-categories`          |
| Ishara Gunarathne           | [@ish-2000](https://github.com/ish-2000)                 | Email Reminder System             | `feature/email-reminders`           |
| Dinitha Fernando            | [@DinithaFdo](https://github.com/DinithaFdo)             | Email Summarization History       | `feature/email-summarization`       |
| Aweesha Thavishanka         | [@aweeshathavishanka](https://github.com/aweeshathavishanka) | AI Features                        | `feature/ai-tools`                  |


---

## 📦 Installation & Local Setup

Follow these steps to get MailMind running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mailmind.git
cd mailmind
```

### 2. Clone the Repository

```bash
npm install

or

yarn install
```

### 3. 🔐 Add Environment Variables

```bash
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
AURINCO_API_KEY=your_aurinco_api_key
ORAMA_API_KEY=your_orama_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key (optional)
```

⚠️ Make sure not to commit this file to GitHub.


### 4. 🧪 Run the Development Server

```bash
npm run dev
```

Once the server starts, open your browser and go to: http://localhost:3000

### 5. ✅ Build for Production (Optional)

If you want to deploy or test the production build locally:

```bash
npm run build
npm start
```

### 6. 🧼 Useful Commands

| Command         | Description                                 |
|-----------------|---------------------------------------------|
| `npm run dev`   | Start the development server                |
| `npm run build` | Build the app for production                |
| `npm start`     | Start the production server                 |
| `npm run lint`  | Run linter to find code issues              |
| `npm run format`| Format code using Prettier (if configured)  |




