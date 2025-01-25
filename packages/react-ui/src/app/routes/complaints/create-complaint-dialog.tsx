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
import { Category, CreateComplaintRequestBody } from '@pickup/shared'
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
    categories: Category[]
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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        const formData = form.getValues()
        let hasError = false

        if (!formData.title.trim()) {
            form.setError('title', { message: t('Title is required') })
            hasError = true
        }
        if (!formData.categoryId) {
            form.setError('categoryId', { message: t('Category is required') })
            hasError = true
        }
        if (!formData.description.trim()) {
            form.setError('description', { message: t('Description is required') })
            hasError = true
        }

        if (!hasError) {
            form.handleSubmit(data => mutate(data))(e)
        }
    }

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
                        onSubmit={onSubmit}
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
                                        id="title"
                                        type="text"
                                        className="rounded-sm"
                                        onChange={e => {
                                            field.onChange(e)
                                            form.clearErrors('title')
                                        }}
                                        placeholder={t('Enter a title')}
                                    />
                                    {form.formState.errors.title && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.title.message}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={'categoryId'}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="categoryId">{t('Category')}</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.clearErrors('categoryId')
                                        }}
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
                                    {form.formState.errors.categoryId && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.categoryId.message}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <FormField
                            name={'description'}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="description">{t('Description')}</Label>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        className="rounded-sm"
                                        onChange={e => {
                                            field.onChange(e)
                                            form.clearErrors('description')
                                        }}
                                        placeholder={t('Enter a description')}
                                    />
                                    {form.formState.errors.description && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.description.message}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">{t('Cancel')}</Button>
                            </DialogClose>
                            <Button type="submit">{t('Submit')}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
