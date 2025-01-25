import { Button } from '@/components/ui/button'
import {
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Dialog } from '@/components/ui/dialog'
import { FormField, FormItem } from '@/components/ui/form'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from '@/components/ui/use-toast'
import { complaintApi } from '@/lib/complaint-api'
import { useMutation } from '@tanstack/react-query'
import { CreateComplaintRequestBody, ComplaintCategory } from '@pickup/shared'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select'
import { Plus } from 'lucide-react'

type CreateComplaintDialogProps = {
    categories: ComplaintCategory[]
}

export function CreateComplaintDialog({ categories }: CreateComplaintDialogProps) {
    const [openDialog, setOpenDialog] = useState(false)
    const { t } = useTranslation()
    const form = useForm<{
        title: string
        categoryId: string
        description: string
    }>({
        defaultValues: {
            title: '',
            categoryId: '',
            description: '',
        },
    })
    const { mutate } = useMutation({
        mutationFn: (data: CreateComplaintRequestBody) => complaintApi.create(data),
        onSuccess: () => {
            toast({
                title: t('Success'),
                description: t('Complaint Created Successfully'),
                duration: 3000,
            })
            setOpenDialog(false)
        },
        onError: error => {
            console.error(error)
        },
    })

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                    <Plus size={16} />
                    {t('New Complaint')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('Create New Complaint')}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit(data => mutate(data))(e)
                        }}
                        className="flex flex-col gap-2"
                    >
                        <FormField
                            name={'title'}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="title">{t('Title')}</Label>
                                    <Input
                                        {...field}
                                        required
                                        id="title"
                                        type="text"
                                        className="rounded-sm"
                                        onChange={e => field.onChange(e)}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={'categoryId'}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="categoryId">
                                        {t('Category')}
                                    </Label>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={t(
                                                    'Select a category'
                                                )}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    {t('Categories')}
                                                </SelectLabel>
                                                {categories?.map(category => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={'description'}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="description">
                                        {t('Description')}
                                    </Label>
                                    <Textarea
                                        {...field}
                                        required
                                        id="description"
                                        className="rounded-sm"
                                        onChange={e => field.onChange(e)}
                                    />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">{t('Cancel')}</Button>
                            </DialogClose>
                            <Button type="submit">{t('Submit')}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
