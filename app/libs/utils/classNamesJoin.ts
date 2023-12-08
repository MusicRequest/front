export default function classNamesJoin(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
