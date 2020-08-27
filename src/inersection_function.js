export function interSection(left, right) {
	
  return left.filter(x => right.find(item => item.value == x.value) );
/*
    const res=[];
    for (let i=0; i<left.length;i++) {
        for (let j=0; j<right.length;j++) {
            if (left[i].value === right[j].value) {
				let old = res.find(item => item.value === left[i].value);
                if (old === undefined) res.push(left[i]);
                break;
            }    
        }    
    }
return res;	
*/
}

//    return left.filter(x.value => right.includes(x.value) );