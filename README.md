# obesifix-24-be

## Web API:

- `POST /register` melakukan registrasi untuk pengguna baru
  Request body:

  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "age": 0,
    "gender": "string",
    "height": 0,
    "weight": 0,
    "activity": "string",
    "food_type": "string"
  }
  ```

  **NOTE**:
  Pada atribut **gender** nilai yang dapat dimasukkan berupa string berikut `"male","female"`
  Pada atribut **activity** format penulisan string sebagai berikut `"sedentary","lowActive","active","veryActive"`.
  Pada atribut **height** (dalam CM) dan **weight** (dalam KM) menggunakan nilai floating point
  Pada atribut **food_type** menggunakan string dan dipisahkan dengan koma `"duck,fruit,bread"` dan **bukan** sebagai array of string
  <br>

- `POST /login/authjwt` melakukan login menggunakan `email` dan `password`
  Requst body:

  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

  <br>

- `POST /login/google` login menggunakan akun google. NOTE **deprecated endpoint**
  <br>
- `POST /refresh` melakukan pembaruan access token
  Request body:

  ```json
  {
    "refresh_token": "string"
  }
  ```

  endpoint ini dipanggil ketika session dari **access_token** telah habis atau expired
  <br>

- `DELETE /logout` menghapus session user
  <br>

- `GET /user/{userId}` mendapatkan data user
  <br>

- `PUT /user/{userId}` mengubah data user
  Request body:

  ```json
  {
    "name": "string",
    "age": 0,
    "height": 0,
    "weight": 0,
    "activity": "string",
    "food_type": "string"
  }
  ```

  nilai untuk masing-masing atribut sama dengan endpoint `/register`
  <br>

- `POST /prediction` melakukan klasifikasi gambar makanan dan prediksi nilai nutrisinya
  Request body:

  ```json
  {
    "image": "string"
  }
  ```

  image berupa form data file gambar
  <br>

- `GET /recomendation/{userId}` Mendapatkan list makanan berdasarkan data user
