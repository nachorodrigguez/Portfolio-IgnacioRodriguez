/* MENU MOBILE */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* CERRAR MENU AL HACER CLICK EN LINK */
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* CAMBIAR HEADER AL HACER SCROLL */
const scrollHeader = () => {
    const header = document.querySelector('.header')
    // Cuando el scroll es mayor a 50vh
    this.scrollY >= 50 ? header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'
                       : header.style.boxShadow = 'none'
}
window.addEventListener('scroll', scrollHeader)

/* VALIDACION Y ENVIO DE FORMULARIO (SIMULADO) */
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('form-message')

const sendEmail = (e) => {
    e.preventDefault()

    // Validacion basica
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const subject = document.getElementById('subject').value
    const message = document.getElementById('message').value

    if(name === '' || email === '' || subject === '' || message === '') {
        contactMessage.classList.remove('success')
        contactMessage.classList.add('error')
        contactMessage.textContent = 'Por favor, rellena todos los campos.'
        
        setTimeout(() => {
            contactMessage.textContent = ''
            contactMessage.classList.remove('error')
        }, 3000)
        return
    }

    // Envío real a Formspree
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            contactMessage.classList.remove('error')
            contactMessage.classList.add('success')
            contactMessage.textContent = 'Mensaje enviado correctamente. ¡Gracias!'
            contactForm.reset()
        } else {
            response.json().then(data => {
                contactMessage.classList.remove('success')
                contactMessage.classList.add('error')
                if (Object.hasOwn(data, 'errors')) {
                    contactMessage.textContent = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    contactMessage.textContent = 'Oops! Hubo un problema al enviar tu formulario'
                }
            })
        }
    }).catch(error => {
        contactMessage.classList.remove('success')
        contactMessage.classList.add('error')
        contactMessage.textContent = 'Oops! Hubo un problema al enviar tu formulario'
    }).finally(() => {
        setTimeout(() => {
            contactMessage.textContent = ''
            contactMessage.classList.remove('success')
            contactMessage.classList.remove('error')
        }, 4000)
    });
}

contactForm.addEventListener('submit', sendEmail)
