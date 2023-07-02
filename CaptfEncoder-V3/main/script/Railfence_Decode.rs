// Railfence cipher decode

let input="HoeWrlolld";

for i in range(2, input.len()) {  
    print("Shift "+i+": "+railfence_decode(input, "rails:"+i)+"\n");
}
