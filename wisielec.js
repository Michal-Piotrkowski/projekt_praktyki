let game = {
    arr: [],
    answer: [],
    img: 0,
    n: 17,
    m: 2,
    mistakes_counter: 9,
    all_letters: 0,
    blank: 0,
    start_time: 0,
    endTime: 0,
    isTime: false,
    game_start: false,
    difficulty_level: 0,
    letters: ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż"],
    riddles: [["DISCORD", "UNITY", "OŚMIORNICA"], ["FLYING OCTOPUS", "DOM LESTERÓW", "STWÓRZ BOHATERA", "MAGICAL FIGHTER"], ["GRY TO NASZA PASJA", "ASTERIELLE SLAYER OF DWARVES", "WOJOWNICZY MYSZOJELEŃ"]],
    opis: "rozpoczynamy gre",
    in_game: true,
    init: function (n) {
        this.difficulty_level = n
        document.getElementById("game").style.display = "flex";
        [...document.getElementsByClassName("level")].forEach(element => {
            element.style.display = "none"
        });
        this.game_start = true
        let img = document.createElement("img");
        img.style.width = "300px"
        img.src = "img/img9.png";
        img.id = "img"
        let src = document.getElementById("img_div");
        src.appendChild(img);
        console.log(this.letters.length)
        this.make_board();
        this.isTime = true
        this.start_time = new Date()
    },
    make_board: function () {
        for (let i = 0; i < this.m; i++) {
            this.arr[i] = []
            for (let j = 0; j < this.n; j++) {
                let div = document.createElement("div")
                div.classList.add("pole")
                document.getElementById("board").appendChild(div)
                if (this.in_game != false) {
                    this.all_letters = this.answer.length
                    div.addEventListener("click", (e) => { this.zd(this, e.target) });
                }
                this.arr[i][j] = 0
                div.id = i + "_" + j
                if (i == 1) {
                    div.innerHTML = this.letters[j + 17]
                }
                else {
                    div.innerHTML = this.letters[j]
                }

                if ((this.n * i + j) % this.n == 0) {
                    div.style.clear = "both"
                }
            }
        }
        let sign_letters_arr = []
        let sign_choice = this.riddles[this.difficulty_level][this.signGenerator()]
        console.log(sign_choice)

        for (let i = 0; i < sign_choice.length; i++) {
            sign_letters_arr[i] = Array.from(sign_choice[i]);
            console.log(sign_letters_arr)
            let div2 = document.createElement("div")
            div2.id = i + "2"
            div2.classList.add("pole2")
            document.getElementById("sign").appendChild(div2)
            this.answer[i] = sign_letters_arr[i]
            if (this.answer[i] == " ") {
                this.blank += 1
                div2.innerHTML = ""
                div2.style.background = "transparent"
                div2.style.border = "none"
            }
        }
    },

    zd: function (d, e, arr) {
        if (this.in_game == false) {
            return
        }
        if (this.mistakes_counter > 1) {
            let is_okay = false
            for (let i = 0; i < this.answer.length; i++) {
                if (this.answer[i] == e.innerHTML && document.getElementById(i + "2").innerHTML != e.innerHTML) {
                    document.getElementById(i + "2").innerHTML = e.innerHTML
                    this.all_letters -= 1
                    if (this.all_letters - this.blank == -this.answer.length) {
                        document.getElementById("end").innerHTML = "WINNER";
                        document.getElementById("end").style.visibility = "visible";
                        gsap.to("#end", { duration: 2, x: "50vw", opacity: 1 });
                        clearInterval(x)
                        document.getElementById("timer").innerHTML = "OCTOPUS"
                        document.getElementById("img").src = "img/octi.png"
                        this.in_game = false
                        this.isTime = false
                    }
                    this.start_time = new Date()
                    console.log(this.start_time)
                    is_okay = true
                }
            }
            if (is_okay == false) {
                document.getElementById("img").src = "img/img" + (this.mistakes_counter - 1) + ".png";
                this.mistakes_counter -= 1
                if (this.mistakes_counter == 1) {
                    this.in_game = false;
                    setTimeout(() => document.getElementById("img").src = "img/img" + (this.mistakes_counter - 1) + ".png", 500)
                    document.getElementById("end").innerHTML = "GAME OVER";
                    document.getElementById("end").style.visibility = "visible";
                    gsap.to("#end", { duration: 2, x: "50vw", opacity: 1 });
                    this.isTime = false
                    this.endTime = new Date()
                }
            }
        }
    },
    signGenerator: function () {
        let sign_number = Math.floor(Math.random() * this.riddles[this.difficulty_level].length) + 0
        return sign_number
    },
}

let x = setInterval((e) => {
    let time
    if (game.isTime) {
        time = new Date() - game.start_time
    }
    else {
        time = game.endTime - game.start_time
    }

    if (time > 7000) {
        game.in_game = false;
        setTimeout(() => document.getElementById("img").src = "img/img0.png", 500)
        document.getElementById("end").innerHTML = "GAME OVER";
        document.getElementById("end").style.visibility = "visible";
        gsap.to("#end", { duration: 2, x: "50vw", opacity: 1 });
        game.isTime = false
        game.endTime = new Date()
        document.getElementById("timer").innerHTML = "KONIEC CZASU"
    }
    else if (game.game_start == true) {
        document.getElementById("timer").innerHTML = time / 1000 + "s"
    }
}, 1)
