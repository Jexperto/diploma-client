import seedrandom from "seedrandom";
const Colors = require("@material-ui/core/colors");
const colors = [Colors.red, Colors.blue, Colors.green, Colors.amber, Colors.brown, Colors.cyan, Colors.deepOrange, Colors.indigo, Colors.purple, Colors.orange, Colors.purple, Colors.lightBlue, Colors.lightGreen, Colors.teal, Colors.yellow, Colors.blueGrey  ]

export function useColors(){
    return colors;
}

// export function useRandomColors(seed){
//     return (colors.sort((a,b) => seedrandom(seed + a[50]) - 0.5));
// }
