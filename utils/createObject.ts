const createObject = (index: number | null, data: any, type: string) => {
    let newData: any = {}

    switch (type) {
        case 'categories':
            newData = {
                id: index === null ? data.id : index,
                name: index === null ? data.name : data
            }
            break;
        case 'articles':
            const {name, page, content, status, category, preview} = data
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timeZone: 'UTC'
            };
            newData = {
                ...data,
                id: index === null ? data.id : index,
                date: index === null ? data.date : new Date().toLocaleDateString('ru', options),
                name,
                page,
                content,
                status,
                category,
                preview
            }
            break;
        case 'events':
            const {start, end} = data
            newData = {
                ...data,
                id: index === null ? data.date : index,
                start,
                end
            }
            break;
        case 'friends':
            newData = {
                ...data,
                id: index === null ? data.id : index,
            }
            break;
        case 'setting':
            newData = {
                ...data,
            }
            break;
    }
    return newData
}

export default createObject
