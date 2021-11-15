let game = {
    arr: [],
    answer: [],
    img: 0,
    n: 17,
    m: 2,
    mistakes_counter: 9,
    letters: ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W", "X", "Y", "Z", "Ż"],
    riddles: ["FLYING OCTOPUS", "DOM LESTERÓW", "WOJOWNICZY MYSZOJELEŃ", "STWÓRZ BOHATERA", "MAGICAL FIGHTER", "DISCORD", "UNITY", "OŚMIORNICA", "GRY TO NASZA PASJA", "ASTERIELLE SLAYER OF DWARVES"],
    opis: "rozpoczynamy gre",
    in_game: true,
    init: function () {
        let img = document.createElement("img");
        img.style.width = "300px"
        img.src = "img/img9.png";
        img.id = "img"
        let src = document.getElementById("img_div");
        src.appendChild(img);
        console.log(this.letters.length)
        this.make_board();
    },
    make_board: function () {
        for (let i = 0; i < this.m; i++) {
            this.arr[i] = []
            for (let j = 0; j < this.n; j++) {
                let div = document.createElement("div")
                div.classList.add("pole")
                document.getElementById("board").appendChild(div)
                if (this.in_game != false) {
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
        let sign_choice = this.riddles[this.signGenerator()]
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
                div2.innerHTML = ""
                div2.style.backgroundColor = "white"
                div2.style.border = "none"
            }
        }
    },

    zd: function (d, e, arr) {
        if (this.mistakes_counter > 1) {
            let is_okay = false
            for (let i = 0; i < this.answer.length; i++) {
                if (this.answer[i] == e.innerHTML && document.getElementById(i + "2").innerHTML != e.innerHTML) {
                    document.getElementById(i + "2").innerHTML = e.innerHTML
                    is_okay = true
                }
            }
            if (is_okay == false) {
                document.getElementById("img").src = "img/img" + (this.mistakes_counter - 1) + ".png";
                this.mistakes_counter -= 1
                console.log(this.mistakes_counter)
            }
            console.log("git")
        }
        else {
            this.in_game = false;
            alert("PRZEGRAŁEŚ")
        }
    },
    signGenerator: function () {
        let sign_number = Math.floor(Math.random() * this.riddles.length) + 0
        return sign_number
    },
}
