import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface Model {
  id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  bust: number;
  metro: string;
  services: string[];
  price: string;
  priceHour: number;
  image: string;
  isVerified: boolean;
  rating: number;
  reviews: number;
  description: string;
  phone: string;
  available: boolean;
  apartment: string;
  hairColor: string;
  ethnicity: string;
}

const models: Model[] = [
  {
    id: 1,
    name: 'Кристина',
    age: 23,
    height: 168,
    weight: 52,
    bust: 3,
    metro: 'Арбатская',
    services: ['Классический секс', 'Минет', 'Куннилингус', 'Массаж'],
    price: '5000 ₽/час',
    priceHour: 5000,
    image: 'https://cdn.poehali.dev/projects/3ccaa4f0-056c-44fb-bdd3-b5f9c62cf269/files/4839900a-5e34-4304-bf52-765bafa255a4.jpg',
    isVerified: true,
    rating: 4.8,
    reviews: 127,
    description: 'Привлекательная девушка с отличной фигурой. Люблю свою работу и гарантирую незабываемые эмоции.',
    phone: '+7 (999) 123-45-67',
    available: true,
    apartment: 'Своя квартира',
    hairColor: 'Брюнетка',
    ethnicity: 'Европейская'
  },
  {
    id: 2,
    name: 'Алёна',
    age: 25,
    height: 172,
    weight: 55,
    bust: 3,
    metro: 'Тверская',
    services: ['Классический секс', 'Минет', 'Анал', 'Массаж', 'Стриптиз'],
    price: '6000 ₽/час',
    priceHour: 6000,
    image: 'https://cdn.poehali.dev/projects/3ccaa4f0-056c-44fb-bdd3-b5f9c62cf269/files/a6bb9481-fa26-45a5-bb60-b84b6de8ed2f.jpg',
    isVerified: true,
    rating: 4.9,
    reviews: 203,
    description: 'Утонченная и страстная, умею создать атмосферу и подарить незабываемые впечатления.',
    phone: '+7 (999) 234-56-78',
    available: true,
    apartment: 'Своя квартира',
    hairColor: 'Блондинка',
    ethnicity: 'Европейская'
  },
  {
    id: 3,
    name: 'Виктория',
    age: 27,
    height: 175,
    weight: 58,
    bust: 4,
    metro: 'Маяковская',
    services: ['Классический секс', 'Минет', 'Анал', 'Массаж', 'Лесби', 'Групповой секс'],
    price: '8000 ₽/час',
    priceHour: 8000,
    image: 'https://cdn.poehali.dev/projects/3ccaa4f0-056c-44fb-bdd3-b5f9c62cf269/files/22485782-159e-44b3-a75e-0b1eaa604f13.jpg',
    isVerified: true,
    rating: 5.0,
    reviews: 342,
    description: 'Элитная модель с безупречными формами. Работаю только с проверенными клиентами.',
    phone: '+7 (999) 345-67-89',
    available: false,
    apartment: 'Апартаменты',
    hairColor: 'Брюнетка',
    ethnicity: 'Европейская'
  }
];

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [metroFilter, setMetroFilter] = useState<string>('all');
  const [ageRange, setAgeRange] = useState<number[]>([18, 45]);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 20000]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<string>('popular');

  let filteredModels = models.filter(model => {
    if (metroFilter !== 'all' && model.metro !== metroFilter) return false;
    if (model.age < ageRange[0] || model.age > ageRange[1]) return false;
    if (model.priceHour < priceRange[0] || model.priceHour > priceRange[1]) return false;
    if (onlyVerified && !model.isVerified) return false;
    if (onlyAvailable && !model.available) return false;
    return true;
  });

  if (sortBy === 'price-asc') {
    filteredModels = [...filteredModels].sort((a, b) => a.priceHour - b.priceHour);
  } else if (sortBy === 'price-desc') {
    filteredModels = [...filteredModels].sort((a, b) => b.priceHour - a.priceHour);
  } else if (sortBy === 'rating') {
    filteredModels = [...filteredModels].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gold">MOSWOM</h1>
              <nav className="hidden md:flex gap-6">
                <a href="#" className="text-sm text-foreground/80 hover:text-gold transition-colors">Главная</a>
                <a href="#" className="text-sm text-foreground/80 hover:text-gold transition-colors">Новые</a>
                <a href="#" className="text-sm text-foreground/80 hover:text-gold transition-colors">Проверенные</a>
                <a href="#" className="text-sm text-foreground/80 hover:text-gold transition-colors">Элитные</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Icon name="Plus" size={16} className="mr-2" />
                Разместить анкету
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <aside className="space-y-4">
            <Card className="bg-card border-border/50 p-4">
              <h3 className="font-semibold mb-4 text-gold">Фильтры</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-foreground/70 mb-2 block">Метро</label>
                  <Select value={metroFilter} onValueChange={setMetroFilter}>
                    <SelectTrigger className="bg-secondary border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все станции</SelectItem>
                      <SelectItem value="Арбатская">Арбатская</SelectItem>
                      <SelectItem value="Тверская">Тверская</SelectItem>
                      <SelectItem value="Маяковская">Маяковская</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-foreground/70 mb-2 block">
                    Возраст: {ageRange[0]} - {ageRange[1]} лет
                  </label>
                  <Slider
                    min={18}
                    max={45}
                    step={1}
                    value={ageRange}
                    onValueChange={setAgeRange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm text-foreground/70 mb-2 block">
                    Цена: {priceRange[0]} - {priceRange[1]} ₽
                  </label>
                  <Slider
                    min={1000}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified" 
                      checked={onlyVerified}
                      onCheckedChange={(checked) => setOnlyVerified(checked as boolean)}
                    />
                    <label
                      htmlFor="verified"
                      className="text-sm text-foreground/70 cursor-pointer"
                    >
                      Только проверенные
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="available" 
                      checked={onlyAvailable}
                      onCheckedChange={(checked) => setOnlyAvailable(checked as boolean)}
                    />
                    <label
                      htmlFor="available"
                      className="text-sm text-foreground/70 cursor-pointer"
                    >
                      Доступны сейчас
                    </label>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-card border-border/50 p-4">
              <h3 className="font-semibold mb-3 text-gold">Популярные услуги</h3>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-foreground/70 hover:text-gold transition-colors">Классический секс</a>
                <a href="#" className="block text-foreground/70 hover:text-gold transition-colors">Минет без презерватива</a>
                <a href="#" className="block text-foreground/70 hover:text-gold transition-colors">Анальный секс</a>
                <a href="#" className="block text-foreground/70 hover:text-gold transition-colors">Массаж</a>
                <a href="#" className="block text-foreground/70 hover:text-gold transition-colors">Групповой секс</a>
              </div>
            </Card>
          </aside>

          <main>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gold mb-1">
                  Индивидуалки Москвы
                </h2>
                <p className="text-sm text-foreground/60">
                  Найдено анкет: {filteredModels.length}
                </p>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-secondary border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">По популярности</SelectItem>
                  <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                  <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {filteredModels.map(model => (
                <Card
                  key={model.id}
                  className="bg-card border-border/50 hover:border-gold/50 transition-all cursor-pointer overflow-hidden"
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="md:flex">
                    <div className="md:w-64 relative aspect-[3/4] md:aspect-auto overflow-hidden">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {model.isVerified && (
                        <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Проверена
                        </Badge>
                      )}
                      {model.available && (
                        <Badge className="absolute top-3 right-3 bg-gold text-background">
                          Доступна
                        </Badge>
                      )}
                    </div>

                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gold mb-1">{model.name}, {model.age} лет</h3>
                          <div className="flex items-center gap-2 text-sm text-foreground/60">
                            <Icon name="MapPin" size={14} />
                            <span>м. {model.metro}</span>
                            <span>•</span>
                            <span>{model.apartment}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gold mb-1">{model.price}</div>
                          {model.rating && (
                            <div className="flex items-center gap-1 text-sm">
                              <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-foreground/80">{model.rating}</span>
                              <span className="text-foreground/50">({model.reviews})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                        <div className="bg-secondary/50 rounded px-3 py-2">
                          <div className="text-foreground/50 text-xs mb-1">Рост</div>
                          <div className="text-foreground">{model.height} см</div>
                        </div>
                        <div className="bg-secondary/50 rounded px-3 py-2">
                          <div className="text-foreground/50 text-xs mb-1">Вес</div>
                          <div className="text-foreground">{model.weight} кг</div>
                        </div>
                        <div className="bg-secondary/50 rounded px-3 py-2">
                          <div className="text-foreground/50 text-xs mb-1">Грудь</div>
                          <div className="text-foreground">{model.bust} размер</div>
                        </div>
                        <div className="bg-secondary/50 rounded px-3 py-2">
                          <div className="text-foreground/50 text-xs mb-1">Волосы</div>
                          <div className="text-foreground">{model.hairColor}</div>
                        </div>
                      </div>

                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                        {model.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {model.services.slice(0, 5).map(service => (
                          <Badge key={service} variant="outline" className="border-gold/30 text-foreground/70">
                            {service}
                          </Badge>
                        ))}
                        {model.services.length > 5 && (
                          <Badge variant="outline" className="border-gold/30 text-gold">
                            +{model.services.length - 5}
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full md:w-auto bg-gold hover:bg-gold-dark text-background">
                        <Icon name="Phone" size={16} className="mr-2" />
                        Показать телефон
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-20">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-gold/50" />
                <p className="text-foreground/60 text-lg mb-2">Анкеты не найдены</p>
                <p className="text-foreground/40 text-sm">Попробуйте изменить параметры фильтра</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
        <DialogContent className="max-w-5xl bg-card border-gold/30 max-h-[90vh] overflow-y-auto">
          {selectedModel && (
            <div>
              <DialogHeader className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-3xl text-gold mb-2">
                      {selectedModel.name}, {selectedModel.age} лет
                    </DialogTitle>
                    <div className="flex items-center gap-3 text-foreground/60">
                      <Icon name="MapPin" size={16} />
                      <span>м. {selectedModel.metro}</span>
                      <span>•</span>
                      <span>{selectedModel.apartment}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gold mb-2">{selectedModel.price}</div>
                    {selectedModel.rating && (
                      <div className="flex items-center gap-2">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-foreground/80">{selectedModel.rating}</span>
                        <span className="text-foreground/50">({selectedModel.reviews} отзывов)</span>
                      </div>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <img
                    src={selectedModel.image}
                    alt={selectedModel.name}
                    className="w-full rounded-lg object-cover aspect-[3/4]"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gold mb-3">Параметры</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-secondary/50 rounded p-3">
                        <div className="text-foreground/50 text-xs mb-1">Возраст</div>
                        <div className="text-foreground font-medium">{selectedModel.age} лет</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-3">
                        <div className="text-foreground/50 text-xs mb-1">Рост</div>
                        <div className="text-foreground font-medium">{selectedModel.height} см</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-3">
                        <div className="text-foreground/50 text-xs mb-1">Вес</div>
                        <div className="text-foreground font-medium">{selectedModel.weight} кг</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-3">
                        <div className="text-foreground/50 text-xs mb-1">Грудь</div>
                        <div className="text-foreground font-medium">{selectedModel.bust} размер</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-3">
                        <div className="text-foreground/50 text-xs mb-1">Волосы</div>
                        <div className="text-foreground font-medium">{selectedModel.hairColor}</div>
                      </div>
                      <div className="bg-secondary/50 rounded p-3">
                        <div className="text-foreground/50 text-xs mb-1">Внешность</div>
                        <div className="text-foreground font-medium">{selectedModel.ethnicity}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gold mb-3">О себе</h4>
                    <p className="text-foreground/70">{selectedModel.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gold mb-3">Услуги</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedModel.services.map(service => (
                        <Badge key={service} variant="outline" className="border-gold/30 text-foreground/70">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gold hover:bg-gold-dark text-background" size="lg">
                      <Icon name="Phone" size={20} className="mr-2" />
                      {selectedModel.phone}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-secondary border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-gold font-bold mb-4">MOSWOM</h3>
              <p className="text-foreground/60 text-sm">
                Крупнейший каталог проституток Москвы с проверенными анкетами
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground/80">Разделы</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Новые анкеты</a>
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Проверенные</a>
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Элитные</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground/80">Информация</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Правила</a>
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Конфиденциальность</a>
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground/80">Для моделей</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Разместить анкету</a>
                <a href="#" className="block text-foreground/60 hover:text-gold transition-colors">Тарифы</a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 pt-6 text-center text-foreground/40 text-sm">
            <p>© 2025 MOSWOM. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
