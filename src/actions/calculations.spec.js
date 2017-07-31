import { calculateAmortisation, yearlyAmortistaion } from './calculations';
describe('calculateAmortisation', () => {

    it(' returns array with anual amortisation', () => {
        let amortisation = calculateAmortisation(100000, 5000 / 12, 3.0);
        expect(amortisation.length).toEqual(31);
        expect(Math.round(amortisation[0].mortgage)).toEqual(97972);
        expect(Math.round(amortisation[29].mortgage)).toEqual(2877);

    });

    it(' returns empty array if rate is too low', () => {
        let amortisation = calculateAmortisation(100000, 1000 / 12, 3.0);
        expect(amortisation.length).toEqual(0);

    });

    it(' returns empty array if mortgage is 0', () => {
        let amortisation = calculateAmortisation(0, 1000 / 12, 3.0);
        expect(amortisation.length).toEqual(0);

    });

  
});