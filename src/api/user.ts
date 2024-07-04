import {SigninFormType} from "@/types"

export  async function fetchUser({email, password}: SigninFormType) {
  const response = await fetch (
    "https://skypro-music-api.skyeng.tech/user/login/",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
  if (response.status === 400) {
    throw new Error ("Неверный пароль или логин");
  } else if (!response.ok) {
    throw new Error ("Заполните поля");
  }
  const responseData = await response.json();
  return responseData; 

}

export  async function fetchToken({email, password}: SigninFormType) {
  const response = await fetch (
    "https://skypro-music-api.skyeng.tech/user/token/",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
  if (response.status === 400) {
    throw new Error ("Неверный пароль или логин");
  } else if (!response.ok) {
    throw new Error ("Заполните поля");
  }
  const responseData = await response.json();
  return responseData; 
}