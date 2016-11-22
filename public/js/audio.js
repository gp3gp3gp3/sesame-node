var recordingSeconds = 5

navigator.getUserMedia = (
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia
)

var record = document.querySelector('.record')

if (navigator.getUserMedia) {
  console.log('getUserMedia supported')

  var constraints = { audio: true }
  var chunks = []

  var onSuccess = function (stream) {
    var mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = function (e) {
      var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' })
      var blobUrl = URL.createObjectURL(blob)
      var audio = new Audio(blobUrl)

      audio.ontimeupdate = function () {
        console.log('inside on duration change, audio.currentTime', audio.currentTime)
        document.getElementById('trackTime').innerHTML = Math.floor(audio.currentTime) + ' / ' + recordingSeconds
      }

      audio.onended = function () {
        document.getElementById('trackTime').innerHTML = recordingSeconds + ' / ' + recordingSeconds
        record.disabled = false
      }

      audio.play()
      chunks = []
    }

    record.addEventListener('click', function () {
      mediaRecorder.start()
      record.disabled = true
      /*
        This is not ideal, but passing a timeslice to mediaRecorder.start(5000)
        makes for strange behavior.  The dataavailable event keeps firing off every allotted amount
        of timeslice passed to .start(), and while calling mediaRecorder.stop() inside the
        ondataavailable callback works, it throws an error on the console.  I'd rather have the
        code be a millisecond off then throwing errors.
      */
      setTimeout(endRecording, recordingSeconds * 1000)
    })

    var endRecording = function () {
      mediaRecorder.stop()
      console.log('recording stopped')
    }
  }

  var onError = function (err) {
    console.error('Audio error', err)
  }

  navigator.getUserMedia(constraints, onSuccess, onError)
} else {
  console.error('getUserMedia is not supported in your browser')
}
