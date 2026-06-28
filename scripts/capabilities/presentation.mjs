export function addPresentationCapabilityFiles(files, o) {
  if (o.notifications)
    files.set(
      'src/components/notifications.ts',
      "export type NotificationKind='success'|'warning'|'info'|'error'\nexport interface NotificationMessage{id:string;kind:NotificationKind;message:string}\nexport const createNotification=(kind:NotificationKind,message:string):NotificationMessage=>({id:crypto.randomUUID(),kind,message})\n",
    )
  if (o.icons === 'lucide')
    files.set(
      'src/components/Icon.tsx',
      "export { Check,Info,TriangleAlert,XCircle } from 'lucide-react'\n",
    )
}
