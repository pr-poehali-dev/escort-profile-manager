import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Model {
  id: number;
  name: string;
  age: number;
  height: number;
  city: string;
  services: string[];
  price: string;
  image: string;
  isVip: boolean;
  description: string;
  contact: string;
}

const models: Model[] = [
  {
    id: 1,
    name: 'Виктория',
    age: 24,
    height: 175,
    city: 'Москва',
    services: ['VIP', 'Сопровождение', 'Выезд'],
    price: '30 000 ₽/час',
    image: 'https://cdn.poehali.dev/projects/3ccaa4f0-056c-44fb-bdd3-b5f9c62cf269/files/4839900a-5e34-4304-bf52-765bafa255a4.jpg',
    isVip: true,
    description: 'Элегантная и изысканная спутница для деловых встреч и светских мероприятий.',
    contact: '+7 (999) 123-45-67'
  },
  {
    id: 2,
    name: 'Анастасия',
    age: 22,
    height: 168,
    city: 'Москва',
    services: ['Сопровождение', 'Выезд'],
    price: '20 000 ₽/час',
    image: 'https://cdn.poehali.dev/projects/3ccaa4f0-056c-44fb-bdd3-b5f9c62cf269/files/a6bb9481-fa26-45a5-bb60-b84b6de8ed2f.jpg',
    isVip: false,
    description: 'Очаровательная девушка с безупречными манерами и отличным чувством стиля.',
    contact: '+7 (999) 234-56-78'
  },
  {
    id: 3,
    name: 'Екатерина',
    age: 26,
    height: 172,
    city: 'Санкт-Петербург',
    services: ['VIP', 'Сопровождение', 'Выезд', 'Мероприятия'],
    price: '35 000 ₽/час',
    image: 'https://cdn.poehali.dev/projects/3ccaa4f0-056c-44fb-bdd3-b5f9c62cf269/files/22485782-159e-44b3-a75e-0b1eaa604f13.jpg',
    isVip: true,
    description: 'Утонченная красавица с образованием и знанием этикета высшего общества.',
    contact: '+7 (999) 345-67-89'
  }
];

const Index = () => {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showVipOnly, setShowVipOnly] = useState(false);
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [ageRange, setAgeRange] = useState<number[]>([18, 35]);
  const [activeTab, setActiveTab] = useState<'services' | 'catalog' | 'vip'>('catalog');

  const filteredModels = models.filter(model => {
    if (showVipOnly && !model.isVip) return false;
    if (cityFilter !== 'all' && model.city !== cityFilter) return false;
    if (model.age < ageRange[0] || model.age > ageRange[1]) return false;
    return true;
  });

  const vipModels = models.filter(m => m.isVip);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gold">ELITE ESCORT</h1>
            <nav className="flex gap-6">
              <button
                onClick={() => setActiveTab('services')}
                className={`text-sm tracking-wider transition-colors ${
                  activeTab === 'services' ? 'text-gold' : 'text-foreground/60 hover:text-gold'
                }`}
              >
                УСЛУГИ
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`text-sm tracking-wider transition-colors ${
                  activeTab === 'catalog' ? 'text-gold' : 'text-foreground/60 hover:text-gold'
                }`}
              >
                КАТАЛОГ
              </button>
              <button
                onClick={() => setActiveTab('vip')}
                className={`text-sm tracking-wider transition-colors ${
                  activeTab === 'vip' ? 'text-gold' : 'text-foreground/60 hover:text-gold'
                }`}
              >
                VIP
              </button>
            </nav>
          </div>
        </div>
      </header>

      {activeTab === 'services' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-gold">Наши услуги</h2>
            <p className="text-foreground/70 text-lg">
              Эксклюзивное сопровождение премиум-класса для взыскательных клиентов
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: 'Sparkles',
                title: 'VIP Сопровождение',
                description: 'Элитные спутницы для деловых встреч и светских мероприятий'
              },
              {
                icon: 'Calendar',
                title: 'Мероприятия',
                description: 'Профессиональное сопровождение на корпоративных и частных событиях'
              },
              {
                icon: 'Plane',
                title: 'Выезд',
                description: 'Сопровождение в поездках по России и за рубежом'
              },
              {
                icon: 'Wine',
                title: 'Ужины',
                description: 'Приятная компания для романтических вечеров'
              },
              {
                icon: 'Clock',
                title: '24/7',
                description: 'Круглосуточная служба бронирования и поддержки'
              },
              {
                icon: 'Shield',
                title: 'Конфиденциальность',
                description: 'Полная анонимность и безопасность для наших клиентов'
              }
            ].map((service, idx) => (
              <Card key={idx} className="bg-card border-border/50 hover:border-gold/50 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-gold/10">
                      <Icon name={service.icon} className="text-gold" size={32} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gold">{service.title}</h3>
                  <p className="text-foreground/60 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'catalog' && (
        <section className="container mx-auto px-4 py-12 animate-fade-in">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-gold">Каталог моделей</h2>
            
            <Card className="bg-card border-border/50 p-6 mb-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm text-foreground/70 mb-2 block">Город</label>
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger className="bg-secondary border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все города</SelectItem>
                      <SelectItem value="Москва">Москва</SelectItem>
                      <SelectItem value="Санкт-Петербург">Санкт-Петербург</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm text-foreground/70 mb-2 block">
                    Возраст: {ageRange[0]} - {ageRange[1]} лет
                  </label>
                  <Slider
                    min={18}
                    max={35}
                    step={1}
                    value={ageRange}
                    onValueChange={setAgeRange}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    variant={showVipOnly ? 'default' : 'outline'}
                    onClick={() => setShowVipOnly(!showVipOnly)}
                    className="w-full"
                  >
                    <Icon name="Crown" size={16} className="mr-2" />
                    Только VIP
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredModels.map(model => (
              <Card
                key={model.id}
                className="bg-card border-border/50 overflow-hidden hover:border-gold/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedModel(model)}
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {model.isVip && (
                    <Badge className="absolute top-4 right-4 bg-gold text-background">
                      <Icon name="Crown" size={14} className="mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gold">{model.name}</h3>
                  <div className="space-y-2 text-sm text-foreground/70 mb-4">
                    <div className="flex justify-between">
                      <span>Возраст:</span>
                      <span className="text-foreground">{model.age} лет</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Рост:</span>
                      <span className="text-foreground">{model.height} см</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Город:</span>
                      <span className="text-foreground">{model.city}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.services.map(service => (
                      <Badge key={service} variant="outline" className="border-gold/30 text-gold/80">
                        {service}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xl font-semibold text-gold">{model.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-gold/50" />
              <p className="text-foreground/60">По вашим критериям моделей не найдено</p>
            </div>
          )}
        </section>
      )}

      {activeTab === 'vip' && (
        <section className="container mx-auto px-4 py-20 animate-fade-in">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Icon name="Crown" size={64} className="mx-auto mb-6 text-gold" />
            <h2 className="text-5xl font-bold mb-6 text-gold">VIP Collection</h2>
            <p className="text-foreground/70 text-lg">
              Эксклюзивная коллекция наших лучших моделей премиум-класса
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {vipModels.map(model => (
              <Card
                key={model.id}
                className="bg-card border-gold/30 overflow-hidden hover:border-gold transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedModel(model)}
              >
                <div className="md:flex">
                  <div className="md:w-1/2 relative overflow-hidden aspect-[3/4]">
                    <img
                      src={model.image}
                      alt={model.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-8 md:w-1/2 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-gold text-background">
                      <Icon name="Crown" size={14} className="mr-1" />
                      VIP EXCLUSIVE
                    </Badge>
                    <h3 className="text-3xl font-semibold mb-4 text-gold">{model.name}</h3>
                    <p className="text-foreground/70 mb-6">{model.description}</p>
                    <div className="space-y-2 text-sm text-foreground/70 mb-6">
                      <div className="flex justify-between">
                        <span>Возраст:</span>
                        <span className="text-foreground">{model.age} лет</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Рост:</span>
                        <span className="text-foreground">{model.height} см</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Город:</span>
                        <span className="text-foreground">{model.city}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-semibold text-gold mb-4">{model.price}</div>
                    <Button className="w-full bg-gold hover:bg-gold-dark text-background">
                      Забронировать
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Dialog open={!!selectedModel} onOpenChange={() => setSelectedModel(null)}>
        <DialogContent className="max-w-4xl bg-card border-gold/30">
          {selectedModel && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
                <img
                  src={selectedModel.image}
                  alt={selectedModel.name}
                  className="w-full h-full object-cover"
                />
                {selectedModel.isVip && (
                  <Badge className="absolute top-4 right-4 bg-gold text-background">
                    <Icon name="Crown" size={14} className="mr-1" />
                    VIP
                  </Badge>
                )}
              </div>
              <div>
                <DialogHeader>
                  <DialogTitle className="text-3xl text-gold mb-4">{selectedModel.name}</DialogTitle>
                </DialogHeader>
                <p className="text-foreground/70 mb-6">{selectedModel.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Icon name="User" size={20} className="text-gold" />
                    <span>Возраст: {selectedModel.age} лет</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Icon name="Ruler" size={20} className="text-gold" />
                    <span>Рост: {selectedModel.height} см</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Icon name="MapPin" size={20} className="text-gold" />
                    <span>Город: {selectedModel.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Icon name="Phone" size={20} className="text-gold" />
                    <span>{selectedModel.contact}</span>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground/70 mb-3">Услуги:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedModel.services.map(service => (
                      <Badge key={service} variant="outline" className="border-gold/30 text-gold">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gold mb-6">{selectedModel.price}</div>
                <Button className="w-full bg-gold hover:bg-gold-dark text-background" size="lg">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Связаться
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border/50 bg-card/30 mt-20">
        <div className="container mx-auto px-4 py-12 text-center">
          <h3 className="text-2xl font-bold text-gold mb-4">ELITE ESCORT</h3>
          <p className="text-foreground/60 mb-6">Премиальные услуги сопровождения</p>
          <div className="flex justify-center gap-6 text-foreground/60">
            <a href="#" className="hover:text-gold transition-colors">Конфиденциальность</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition-colors">Условия</a>
            <span>•</span>
            <a href="#" className="hover:text-gold transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
