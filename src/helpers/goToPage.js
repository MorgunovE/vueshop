import eventBus from '@/eventBus'

export default function goToPage(pageName, pageParams){
  eventBus.$emit('goToPage', pageName, pageParams)
}