function OnlyOne(number){
    if(OnlyOne.install){
        return OnlyOne.install
    }
    this.number = number
    OnlyOne.install = this
    return OnlyOne.install
}

OnlyOne.install = null

number1 = new OnlyOne(123)
number2 = new OnlyOne(456)
console.log(number1) // 123
console.log(number2) // 123