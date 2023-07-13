/* getElementById函数：获取对应的HTML元素对象 */
const musicContainer = document.getElementById("music-container")
const playBtn = document.getElementById("play")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")

const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")
const title = document.getElementById("title")
const musicCover = document.getElementById("music-cover")

// 音乐信息，数组存储
const songs = ["鏡面の波 (TSAR Remix)", "銀色の空", "ヨスガノソラ メインテーマ"]
// 默认从第一首开始
let songIndex = 0;
// 将歌曲细节加载到DOM
loadSong(songs[songIndex])
/* 操作title元素的innerHTML属性，显示歌曲名称 */
function loadSong(song) {
    title.innerHTML = song
    /* 解析封面和歌曲路径，使名称、封面、音频一致 */
    audio.src = `music/${song}.mp3`;      //路径为 music/鏡面の波 (TSAR Remix).mp3
    musicCover.src = `img/${song}.jpg`;
}

// 播放歌曲
function playSong() {
    //musicContainer元素添加名为 "play" 的类名，改变container外观表示正在播放
    musicContainer.classList.add("play")
    /* 移除fa-play类名 */
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    /* 为匹配到的元素添加fa-pause类名 */
    /* 能将（fa-play）更改为暂停图标（fa-pause） */
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

// 停止播放
function pauseSong() {
    musicContainer.classList.remove('play');
    /* 同上，调换两句顺序即可 */
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// 上一首
function prevSong() {
   /* 索引，表示放到第几首了 */
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    // 加载歌曲信息并播放
    loadSong(songs[songIndex])
    playSong();
}
// 下一首
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// 更新进度条
function updateProgress(e) {
    /* duration：浏览器提供的audio属性，当音频加载完成后，自动获取音频的总时长 */
    // currentTime: 自带audio属性，音频播放当前位置，与解构连用
    /* 通过事件对象e.target访问音频元素，使用对象解构操作提取出duration和currentTime操作  */
    const {
        duration,
        currentTime
    } = e.target;
    /* 播放进度的百分比 */
    const progressPercent = (currentTime / duration) * 100
    /* ${progressPercent}%：模板字符串，被解析为当前播放进度的百分比，作为字符串插入到 width 样式中
    动态设置进度条的宽度 */
    progress.style.width = `${progressPercent}%`
}
// 设置进度条
function setProgress(e) {
    // progressContainer代理视图宽度
    const width = this.clientWidth
    // 鼠标点击时处于progressContainer里的水平偏移量
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}
// 事件监听
// 1.播放歌曲
/* 给播放暂停按钮添加了点击事件的监听器，判断是暂停还是正在播放音乐，上一首下一首同理 */
playBtn.onclick = function () {
    musicContainer.classList.contains('play') ? pauseSong() : playSong()
}
// 2.切换歌曲
prevBtn.onclick = prevSong
nextBtn.onclick = nextSong

// 3.播放器进度条相关
// 3.1 播放进度
progressContainer.onclick = setProgress
// 3.2 重新更新进度条
audio.ontimeupdate = updateProgress
// 3.3 歌曲结束后自动下一首
audio.onended = nextSong