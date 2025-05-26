import client from './client';

const domain = typeof window !== "undefined" ? window.location.hostname: ""

async function postLogin(login, password) {
  const bodyFormData = new FormData();

  bodyFormData.append('login', login);
  bodyFormData.append('password', password);

  return client.post(`/auth/login`, { login, password }).then(response => response?.data)
}

async function postRecovery(login) {
  return client
    .post(`/auth/recovery`, {
      domain,
      login,
    })
    .then(response => response?.data);
}

async function postReset(newPassword, id) {
  return client
    .post(`/auth/reset/${id}`, {
      newPassword,
    })
    .then(response => response?.data);
}

async function getRegistration() {
  return client.get(`/registration`).then(response => response?.data);
}

async function postRegistration(registrationProps) {
  console.log(registrationProps, "registration props")
  return client
    .post(`/registration`, {
      ...registrationProps,
    })
    .then(response => response?.data);
}

async function postSetup(password, setupPasswordToken) {
  return client
    .post(
      `/registration/setupPassword`,
      {
        newPassword: password,
        setupPasswordToken,
      },
      { headers: { Authorization: `Bearer ${setupPasswordToken}` } },
    )
    .then(response => response?.data);
}

export { postLogin, getRegistration, postRecovery, postReset, postRegistration, postSetup };
