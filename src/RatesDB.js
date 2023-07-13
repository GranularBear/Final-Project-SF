const RatesDB = [{
    title: 'Beginner',
    description: 'Для небольшого исследования',
    price: '1200',
    sale: '799',
    installmentRate: '150',
    perks: ['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7'],
    active: 0
}, {
    title: 'Pro',
    description: 'Для HR и фрилансеров',
    price: '2600',
    sale: '1299',
    installmentRate: '279',
    perks: ['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам'],
    active: 1
}, {
    title: 'Business',
    description: 'Для корпоративных клиентов',
    price: '3700',
    sale: '2379',
    installmentRate: '',
    perks: ['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка'],
    active: 0
}]

export default RatesDB;