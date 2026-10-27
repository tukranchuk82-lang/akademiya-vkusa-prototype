/* Телефон: выбор страны и проверка номера по формату страны.
   Список короткий, для прототипа. В боевой версии вместо таблицы подключается библиотека libphonenumber. */
var COUNTRIES=[
 {id:'RU',name:'Россия',dial:'7',min:10,max:10,g:[3,3,2,2],first:'9',firstMsg:'Укажите мобильный номер: российские мобильные номера начинаются с 9'},
 {id:'KZ',name:'Казахстан',dial:'7',min:10,max:10,g:[3,3,2,2]},
 {id:'BY',name:'Беларусь',dial:'375',min:9,max:9,g:[2,3,2,2]},
 {id:'UA',name:'Украина',dial:'380',min:9,max:9,g:[2,3,2,2]},
 {id:'UZ',name:'Узбекистан',dial:'998',min:9,max:9,g:[2,3,2,2]},
 {id:'KG',name:'Кыргызстан',dial:'996',min:9,max:9,g:[3,3,3]},
 {id:'TJ',name:'Таджикистан',dial:'992',min:9,max:9,g:[3,3,3]},
 {id:'TM',name:'Туркменистан',dial:'993',min:8,max:8,g:[2,6]},
 {id:'AM',name:'Армения',dial:'374',min:8,max:8,g:[2,3,3]},
 {id:'AZ',name:'Азербайджан',dial:'994',min:9,max:9,g:[2,3,2,2]},
 {id:'GE',name:'Грузия',dial:'995',min:9,max:9,g:[3,2,2,2]},
 {id:'MD',name:'Молдова',dial:'373',min:8,max:8,g:[2,3,3]},
 {id:'LV',name:'Латвия',dial:'371',min:8,max:8,g:[2,3,3]},
 {id:'LT',name:'Литва',dial:'370',min:8,max:8,g:[3,2,3]},
 {id:'EE',name:'Эстония',dial:'372',min:7,max:8,g:[4,4]},
 {id:'DE',name:'Германия',dial:'49',min:10,max:11,g:[3,4,4]},
 {id:'FR',name:'Франция',dial:'33',min:9,max:9,g:[1,2,2,2,2]},
 {id:'GB',name:'Великобритания',dial:'44',min:10,max:10,g:[4,6]},
 {id:'IT',name:'Италия',dial:'39',min:9,max:10,g:[3,3,4]},
 {id:'ES',name:'Испания',dial:'34',min:9,max:9,g:[3,3,3]},
 {id:'PL',name:'Польша',dial:'48',min:9,max:9,g:[3,3,3]},
 {id:'CZ',name:'Чехия',dial:'420',min:9,max:9,g:[3,3,3]},
 {id:'RS',name:'Сербия',dial:'381',min:8,max:9,g:[2,3,4]},
 {id:'ME',name:'Черногория',dial:'382',min:8,max:8,g:[2,3,3]},
 {id:'GR',name:'Греция',dial:'30',min:10,max:10,g:[3,3,4]},
 {id:'CY',name:'Кипр',dial:'357',min:8,max:8,g:[2,3,3]},
 {id:'TR',name:'Турция',dial:'90',min:10,max:10,g:[3,3,2,2]},
 {id:'IL',name:'Израиль',dial:'972',min:9,max:9,g:[2,3,4]},
 {id:'AE',name:'ОАЭ',dial:'971',min:9,max:9,g:[2,3,4]},
 {id:'TH',name:'Таиланд',dial:'66',min:9,max:9,g:[2,3,4]},
 {id:'CN',name:'Китай',dial:'86',min:11,max:11,g:[3,4,4]},
 {id:'US',name:'США и Канада',dial:'1',min:10,max:10,g:[3,3,4]},
 {id:'XX',name:'Другая страна',dial:'',min:8,max:15,g:[],other:true}
];
function countryById(id){return COUNTRIES.filter(function(c){return c.id===id})[0]||COUNTRIES[0]}
function phoneFormat(cc,digits){
 var out=[],i=0;
 cc.g.forEach(function(n){if(i<digits.length){out.push(digits.substr(i,n));i+=n}});
 if(i<digits.length)out.push(digits.slice(i));
 return out.join(' ');
}
function digitsWord(n){var m=n%100,k=n%10;return n+' '+(m>10&&m<20?'цифр':k===1?'цифра':k>1&&k<5?'цифры':'цифр')}
function lenText(cc){return cc.min===cc.max?digitsWord(cc.min):'от '+cc.min+' до '+digitsWord(cc.max)}
/* ошибка по уже введённым цифрам; final — проверка при отправке или уходе из поля */
function phoneCheck(cc,digits,final){
 if(!digits.length)return final?'Введите номер телефона':'';
 if(cc.first&&digits.charAt(0)!==cc.first)return cc.firstMsg;
 if(digits.length<cc.min)return final?'Не хватает цифр: нужно '+lenText(cc)+(cc.other?' вместе с кодом страны':'')+', сейчас '+digits.length+'. Укажите мобильный номер':'';
 return '';
}
/* код страны, с которого начинается вставленный номер вида +375...; при равных кодах остаётся выбранная страна */
function countryByPrefix(digits,cur){
 if(cur.dial&&digits.indexOf(cur.dial)===0)return cur;
 var best=null;
 COUNTRIES.forEach(function(c){if(c.dial&&digits.indexOf(c.dial)===0&&(!best||c.dial.length>best.dial.length))best=c});
 return best;
}
