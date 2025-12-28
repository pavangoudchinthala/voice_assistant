let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

/* =========================
   TEXT TO SPEECH
========================= */
function speak(text, lang = "en-IN") {
    window.speechSynthesis.cancel(); // stop previous speech
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
}

/* =========================
   GREETING
========================= */
function wishMe() {
    let hour = new Date().getHours();
    if (hour < 12) speak("Good morning sir");
    else if (hour < 16) speak("Good afternoon sir");
    else speak("Good evening sir");
}
// wishMe(); // optional

/* =========================
   SPEECH RECOGNITION
========================= */
let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = "en-IN";
recognition.interimResults = false;

recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

/* =========================
   MAIN COMMAND HANDLER
========================= */
function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    /* ---- WAKE WORD ---- */
    if (message.includes("hey ai")) {
        speak("Yes, I am listening");
        return;
    }

    /* ---- BASIC COMMANDS ---- */
    if (message.includes("hello") || message.includes("hi")) {
        speak("Hello sir, how can I help you?");
    }

    else if (message.includes("who are you")) {
        speak("I am an AI virtual assistant created by Pavan Goud");
    }

    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://youtube.com", "_blank");
    }

    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://google.com", "_blank");
    }

    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://instagram.com", "_blank");
    }

    else if (message.includes("time")) {
        speak(
            new Date().toLocaleString("en-IN", {
                hour: "numeric",
                minute: "numeric",
            })
        );
    }

    else if (message.includes("date")) {
        speak(
            new Date().toLocaleString("en-IN", {
                day: "numeric",
                month: "long",
            })
        );
    }

    /* =========================
       AI BACKEND (STREAMLIT)
    ========================= */
    else {
        speak("Let me think");

        fetch(`/?query=${encodeURIComponent(message)}`)
    .then(res => res.text())
    .then(reply => {
        content.innerText = reply;
        speak(reply);
    })

            .catch(() => {
                speak(
                    "I could not connect to the AI. Searching on Google instead."
                );
                window.open(
                    `https://www.google.com/search?q=${message}`,
                    "_blank"
                );
            });
    }
}
