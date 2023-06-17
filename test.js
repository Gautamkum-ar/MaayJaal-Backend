import jwt from "jsonwebtoken";

(async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg2OGNkNjI4ZTRlODViMmI3N2NjMiIsImlhdCI6MTY4NjY3MDg2NSwiZXhwIjoxNjg5MjYyODY1fQ.GISBqvxY5-T5BJaa0QQcdg0kid4Smnp32it5Rh6hMLs";
  const decodedToken = await jwt.verify(token, "imgroot");
  console.log(decodedToken);
})();
