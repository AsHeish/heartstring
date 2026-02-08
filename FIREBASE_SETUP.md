# Firebase Setup Guide for Heartstring

To make the app work, you need to set up a Firebase project. This will handle:

- **Database (Firestore):** Storing valentine messages and details.
- **Storage:** Storing uploaded photos.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"** (or "Create a project").
3. Name your project (e.g., `heartstring-valentine`).
4. Disable Google Analytics (optional, not needed for this app).
5. Click **"Create project"**.

## Step 2: Register the Web App

1. Once the project is created, click the **Web icon (</>)** in the center (or go to Project Settings > General > Add app).
2. Register the app nickname (e.g., `Heartstring Web`).
3. Click **"Register app"**.
4. You will see your `firebaseConfig` object. **Keep this tab open** or copy the values.

## Step 3: Configure Environment Variables

1. In your project root (where `package.json` is), create a new file named `.env.local`.
2. Copy the content from `.env.example` into `.env.local`.
3. fill in the values from the Firebase console:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 4: Set up Firestore (Database)

1. In the Firebase Console sidebar, go to **Build > Firestore Database**.
2. Click **"Create database"**.
3. Choose a location (e.g., `nam5 (us-central)` or one close to you).
4. Start in **Test mode** (for development).
    - _Note: Test mode allows anyone to read/write for 30 days. For production, you'll want stricter rules._
5. Click **"Create"**.

## Step 5: Set up Storage (Photos)

1. In the Firebase Console sidebar, go to **Build > Storage**.
2. Click **"Get started"**.
3. Start in **Test mode**.
4. Click **"Done"**.

## Step 6: Update CORS (Optional but Recommended)

If you have issues uploading images, you might need to configure CORS for your storage bucket, but usually, default settings work for development on localhost.

## Step 7: Restart Development Server

After creating the `.env.local` file, you **must restart** your Vite server:

1. Stop the running server (Ctrl+C).
2. Run `npm run dev` again.

Now your app should be able to create valentines and upload photos!
