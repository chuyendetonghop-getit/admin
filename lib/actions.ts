"use server";

// 1. Auth actions

export async function loginAction(data: FormData) {
  console.log("Login action called", data.get("email"), data.get("password"));

  // set cookie here
}

// 2.Dashboard actions

// 3. User actions

// 4. Post actions

// 5. Report actions
