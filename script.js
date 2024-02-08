const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

// Initializing the SpeechSynthesis API provided by the browser
let synth = speechSynthesis;
// Variable to track the speaking status
let isSpeaking = true;

// Function to populate the dropdown list with available voices from the browser
function populateVoices() {
  for (let voice of synth.getVoices()) {
    // Setting "Google US English" as the default selected voice
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

// Updating the voices list when voices change
synth.addEventListener("voiceschanged", populateVoices);

// Function to convert text to speech
function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);

  // Setting the selected voice from the dropdown list
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }

  // Event listener to handle the end of speech
  utterance.addEventListener("end", () => {
    isSpeaking = false;
    document.querySelector(".placeholder").style.display = "none";
  });

  // Starting the speech synthesis
  synth.speak(utterance);
  isSpeaking = true;
}

// Event listener for the "Speak" button click
speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  // Checking if the textarea is not empty and speech synthesis is not in progress
  if (textarea.value !== "" && !synth.speaking) {
    textToSpeech(textarea.value);
    document.querySelector(".placeholder").style.display = "block";
  }
});
