export const calculateAmortisation = (mortgage, rate, interest) => {

    return yearlyAmortistaion(monthlyAmortisation(mortgage, rate, interest));
    
 }

// export const monthlyAmortisation = (mortgage, rate, interest) => {

//     let result = [];
    

//     let amortisation = 0;
//     let monthlyInterest;

//     do {
//         result.push({
//             mortgage,
//             amortisation
//         });

//         monthlyInterest = mortgage * interest / 12 * 0.01;
//         amortisation = rate - monthlyInterest;
//         mortgage = mortgage - amortisation;

//     } while (mortgage > 0 && amortisation > 0)

//     return result;
// }

const monthly= (mortgage, rate, interest) =>{
    
    let monthlyInterest = mortgage * interest / 12 * 0.01;
    let amortisation = rate - monthlyInterest;
        
    return {
        mortgage : mortgage - amortisation,
        amortisation
    };   
}

const amortised = (payment) => {
    return payment.mortgage <= 0 || payment.amortisation < 0;
}

export const monthlyAmortisation = (mortgage, rate, interest) => {

    let result = [];
    
    let payment =  monthly(mortgage, rate, interest);

    while(!amortised(payment)){
        result.push(payment);
        payment= monthly(payment.mortgage, rate, interest);
        
    } 
    
    return result;
}


export const yearlyAmortistaion = monthly => {

    let result = [];
    //monthly.splice(0,1);
    while (monthly.length > 0){
        let year = monthly.splice(0, 12);

        result.push(year.reduce((acc, m) => {
            acc.mortgage = m.mortgage;
            acc.amortisation += m.amortisation;
            acc.total= acc.mortgage + acc.amortisation;
            return acc;
        }, { mortgage: 0, amortisation: 0, total: 0 })
        );

    } 
    
    return result;
}