const recordingSeconds = 30
const record = document.querySelector('.record')
let chunks = []

const onSuccess = stream => {
  const mediaRecorder = new MediaRecorder(stream)

  mediaRecorder.ondataavailable = e => chunks.push(e.data)

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' })
    const blobUrl = URL.createObjectURL(blob)
    const audio = new Audio(blobUrl)

    audio.ontimeupdate = () => {
      document.getElementById('trackTime').innerHTML = `${Math.floor(audio.currentTime)} / ${recordingSeconds} seconds`
    }

    audio.onended = () => {
      document.getElementById('trackTime').innerHTML = `${recordingSeconds} / ${recordingSeconds} seconds`
      record.disabled = false
      record.innerHTML = 'Record'
    }

    audio.play()
    chunks = []
  }

  record.addEventListener('click', () => {
    mediaRecorder.start()
    record.disabled = true
    record.innerHTML = 'Recording...'
    /*
      This is not ideal, but passing a timeslice to mediaRecorder.start(5000)
      makes for strange behavior.  The dataavailable event keeps firing off every allotted amount
      of timeslice passed to .start(), and while calling mediaRecorder.stop() inside the
      ondataavailable callback works, it throws an error on the console.  I'd rather have the
      code be a millisecond off using setTimeout then throwing errors.
    */
    setTimeout(endRecording, recordingSeconds * 1000)
  })

  const endRecording = () => {
    mediaRecorder.stop()
    record.innerHTML = 'Playing...'
  }
}

const onError = err => console.error('Audio error', err)

navigator.getUserMedia({ audio: true }, onSuccess, onError)
