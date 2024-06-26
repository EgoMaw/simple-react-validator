 // Swedish
 import SimpleReactValidator from '../simple-react-validator';

export default SimpleReactValidator.addLocale('sv', {
  accepted             : 'Fält :attribute måste accepteras.',
  after                : 'Fält :attribute måste vara efter :date.',
  after_or_equal       : 'Fält :attribute måste matcha eller vara efter :date.',
  alpha                : 'Fält :attribute kan bara innehålla bokstäver.',
  alpha_space          : 'Fält :attribute kan bara innehålla bokstäver och mellanslag.',
  alpha_num            : 'Fält :attribute kan bara innehålla bokstäver och siffror.',
  alpha_num_space      : 'Fält :attribute kan bara innehålla bokstäver, siffror och mellanslag.',
  alpha_num_dash       : 'Fält :attribute kan bara innehålla bokstäver, siffror och bindestreck.',
  alpha_num_dash_space : 'Fält :attribute kan bara innehålla bokstäver, siffror, bindestreck och mellanslag.',
  array                : 'Fält :attribute måste vara en array.',
  before               : 'Fält :attribute måste vara före :date.',
  before_or_equal      : 'Fält :attribute måste matcha eller vara före :date.',
  between              : 'Fält :attribute måste vara mellan :min och :max:type.',
  boolean              : 'Fält :attribute måste vara booleskt.',
  card_exp             : "Fält :attribute måste vara ett giltigt utgångsdatum.",
  card_num             : 'Fält :attribute måste vara ett giltigt kreditkortsnummer.',
  currency             : 'Fält :attribute måste vara en giltig valuta.',
  date                 : 'Fält :attribute måste vara ett datum.',
  date_equals          : 'Fält :attribute måste matcha :date.',
  email                : 'Fält :attribute måste vara en giltig e-postadress.',
  in                   : 'Fält valt :attribute måste vara :values.',
  integer              : 'Fält :attribute måste vara ett heltal.',
  max                  : 'Fält :attribute får inte överstiga :max:type.',
  min                  : 'Fält :attribute måste åtminstone vara :min:type.',
  not_in               : 'Fält vald :attribute får inte vara :values.',
  not_regex            : 'Fält :attribute får inte matcha det obligatoriska mönstret.',
  numeric              : 'Fält :attribute måste vara ett nummer.',
  phone                : 'Fält :attribute måste vara ett giltigt telefonnummer.',
  regex                : 'Fält :attribute måste matcha det obligatoriska mönstret.',
  required             : 'Fält :attribute krävs.',
  size                 : 'Fält :attribute måste vara :size:type.',
  string               : 'Fält :attribute måste vara en sträng.',
  typeof               : "Fält :attribute är inte den korrekta typen av :type.",
  url                  : 'Fält :attribute måste vara en url.',
});
