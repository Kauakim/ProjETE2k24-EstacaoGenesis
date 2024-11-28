async function LerUsuario(Email, Password) {
  try {
      // Busca os dados desejados na tabela de historico
      const response = await fetch(`http://localhost:55000/usuarios?email=${Email}&senha=${Password}`);
      
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
          console.log('Erro na resposta da requisição: ' + response.status);
          return false;
      }

      // Coleta os dados recebidos na requisição
      const data = await response.json();
      
      if(data == 1){
          console.log("Usuario autenticado");
          return true;
      }
      else{
          console.log("Usuário não autenticado");
          return false;
      }
  } catch (error) {
      console.error('Erro ao buscar dados do usuario:', error.stack);
      return false;
  }
}

async function CriarUsuario(Email, Password) {
  try {
      // Busca os dados desejados na tabela de historico
      const response = await fetch('http://localhost:55000/adicionarUsuario', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: Email, senha: Password }) 
      });

      if (!response.ok) {
          console.log('Erro ao adicionar usuário: ' + response.status);
          return false;
      }

      const result = await response.json(); 
      if (result == 1) {
          return true;
      } else {
          return false;
      }

  } catch (error) {
      console.error('Erro ao buscar dados do usuario:', error.stack);
      return false;
  }
}

function toggleForms() {
  var loginForm = document.getElementById("login-form");
  var registerForm = document.getElementById("register-form");

  if (loginForm.classList.contains("hidden")) {
      loginForm.classList.remove("hidden");
      registerForm.classList.add("hidden");
  } 
  else {
      loginForm.classList.add("hidden");
      registerForm.classList.remove("hidden");
  }
}

document.querySelectorAll('.viewSenha').forEach(function(element) {
  element.addEventListener('click', function() {
      let input = this.previousElementSibling;
      let svgPath = this.querySelector('path'); // Seleciona o SVG dentro do botão
    
      if (input.type === "password") {
          input.type = "text";
          svgPath.classList.add('eye-icon');
          svgPath.classList.remove('eye-icon-hidden');
      } else {
          input.type = "password";
          svgPath.classList.add('eye-icon-hidden');
          svgPath.classList.remove('eye-icon');
      }
  });
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  if (validateLogin()) {
      let Email = document.getElementById('login-email').value;
      let Password = document.getElementById('login-password').value;
      
      if(await LerUsuario(Email, Password)){
          window.location.href = "../home.html";
      }
      else{
          alert("Tente novamente...");
      }
  }
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  if (validateRegister()) {
      let Email = document.getElementById('register-email').value;
      let Password = document.getElementById('register-password').value;

      if(await LerUsuario(Email, Password)){
          alert("O usuário escolhido já está cadastrado no sistema."); 
      }
      else{
          if(!await CriarUsuario(Email, Password)){
              alert("Tente novamente...");
          }
          else{
              alert("Usuário cadastrado com sucesso!");
          }
      }
  }
});

function validateLogin() {
  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');

  let valid = true;

  document.getElementById('login-email-error').classList.add('hidden');
  document.getElementById('login-password-error').classList.add('hidden');
  email.classList.remove('border-red-500');
  password.classList.remove('border-red-500');

  if (!validateEmail(email.value)) {
      document.getElementById('login-email-error').textContent = 'Por favor, insira um email válido.';
      document.getElementById('login-email-error').classList.remove('hidden');
      email.classList.add('border-red-500');
      valid = false;
  }

  if (!validatePassword(password.value)) {
      document.getElementById('login-password-error').textContent = 'A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula e um número.';
      document.getElementById('login-password-error').classList.remove('hidden');
      password.classList.add('border-red-500');
      valid = false;
  }

  return valid;
}

function validateRegister() {
  const email = document.getElementById('register-email');
  const password = document.getElementById('register-password');
  const confirmPassword = document.getElementById('register-confirm-password');

  let valid = true;

  document.getElementById('register-email-error').classList.add('hidden');
  document.getElementById('register-password-error').classList.add('hidden');
  document.getElementById('register-confirm-password-error').classList.add('hidden');
  email.classList.remove('border-red-500');
  password.classList.remove('border-red-500');
  confirmPassword.classList.remove('border-red-500');

  if (!validateEmail(email.value)) {
      document.getElementById('register-email-error').textContent = 'Por favor, insira um email válido.';
      document.getElementById('register-email-error').classList.remove('hidden');
      email.classList.add('border-red-500');
      valid = false;
  }

  if (!validatePassword(password.value)) {
      document.getElementById('register-password-error').textContent = 'A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula e um número.';
      document.getElementById('register-password-error').classList.remove('hidden');
      password.classList.add('border-red-500');
      valid = false;
  }

  if (password.value !== confirmPassword.value) {
      document.getElementById('register-confirm-password-error').textContent = 'As senhas não correspondem.';
      document.getElementById('register-confirm-password-error').classList.remove('hidden');
      confirmPassword.classList.add('border-red-500');
      valid = false;
  }

  return valid;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return password.length >= 8 && hasUpperCase && hasNumber;
}