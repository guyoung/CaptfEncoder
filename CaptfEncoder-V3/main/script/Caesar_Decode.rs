// Caesar cipher decode

let input="JgnnqYqtnf";

for i in range(0, 26) {  
    print("Shift "+(i+1)+": "+caesar_decode(input, "shift:"+(i+1))+"\n");
}

