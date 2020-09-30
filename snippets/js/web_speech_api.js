var text = 'This is a example text which should give you an feeling how well the web speech API works.';
var speechApi = window.speechSynthesis;
var speechInterface = new SpeechSynthesisUtterance(text);

speechApi.onvoiceschanged = function() {
  speechInterface.voice = speechApi.getVoices().filter(function(voice) {
    return voice['voiceURI'] === "Google US English"
  })[0];
  speechApi.speak(speechInterface);
};
