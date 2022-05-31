import { Status, Ticket } from "../models/ticket";

export const removeDuplicatesPostUpdate = (array: Ticket[]): Ticket[] => array.reduce(
    (a: Ticket[], b, index, arr) => {
      let sameEmail = [];
      sameEmail = arr.filter( item => item.email === b.email);
      if (sameEmail.length > 1) {
        const test = sameEmail.find( item => item.status === Status.PAID);
        sameEmail = [];
        if (test) {
          a.push(test);
        }
      } else {
        a.push(b);
      }
      return a;
    }, []
  ); 