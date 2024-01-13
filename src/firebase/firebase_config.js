import {} from "dotenv/config";
import admin from "firebase-admin";

import serviceAccount from "./obesifix-skripsi-24-firebase-adminsdk-48m37-4b737a98fb.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
