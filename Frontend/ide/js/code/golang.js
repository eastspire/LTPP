window.golang_tips=[`package main
//请勿更改包名，否则运行失败!
import (
    "fmt"
    "bufio"
    "os"
    "strconv"
    "strings"
)

func read() []int {
    var arr = make([]int, 0);
    inputs := bufio.NewScanner(os.Stdin)
    for inputs.Scan() {
        data := strings.Split(inputs.Text(), " ")
        for i := range data {
            val, _ := strconv.Atoi(data[i])
            arr = append(arr, val)
        }
    }
    return arr;
}

func print(arr []int){
    for i := 0; i < len(arr); i++ {
        fmt.Print(arr[i]," ")
    }
}

func main(){
    var arr = read()
    
    
    print(arr)
}`,"break","default","func","interface","select","case","defer","go","map","struct","chan","else","goto","package","switch","const","fallthrough","if","range","type","continue","for","import","return","var",'"fmt"','"os"','"io"','"time"','"strconv"','"math"','"sort"','"sync"','"encoding/json"','"net/http"','"html/template"'];