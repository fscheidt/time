<script>
import {parseDate, parseAbsolute, getLocalTimeZone} from '@internationalized/date';
import { parse, sub, add, format } from "date-fns";
import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
import Calendar from "$lib/components/ui/calendar/calendar.svelte";
import Label from "$lib/components/ui/label/label.svelte";
import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";

let days = $state(7);
let baseDate = new Date();
const convDate = (jsDate) => {
  return parseAbsolute(jsDate.toISOString(), getLocalTimeZone())
}
let calendarDate = $state(convDate(baseDate));
let invert = $state(false);
let pattern = "dd/MM/yy";
let futureDate = $derived(invert 
  ? convDate(sub(calendarDate.toDate(), {days: days}))
  : convDate(add(calendarDate.toDate(), {days: days}))
)
let dateFormatted = $derived(format(calendarDate.toDate(), pattern))
</script>

<div class="grid grid-cols-2 w-120">

  <div class="grid items-start">

    <div class="flex w-50 justify-between items-center h-11">
      <Label>{dateFormatted}</Label>
      <Checkbox bind:checked={invert} title="invert"/>
      <Input bind:value={days} class="w-16" type="number"/>
    </div>
    <div class="flex items-start w-50 h-44">
      <Calendar
        locale="pt-BR"
        type="single"
        bind:value={calendarDate}
        class="rounded-md border shadow-sm"
      />
    </div>
  </div>
  <div class="grid items-start">
    <div class="flex w-48 items-center h-11">
      <Label class="w-32">{format(futureDate.toDate(), pattern)}</Label>
    </div>
    <div class="flex items-start h-44">
      <Calendar
        locale="pt-BR"
        type="single"
        bind:value={futureDate}
        class="rounded-md border shadow-sm"
      />
    </div>
  </div>
</div>
