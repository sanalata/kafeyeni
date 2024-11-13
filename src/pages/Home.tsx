import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Clock, CreditCard } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative h-[600px] rounded-3xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80"
          alt="Turkish Coffee"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white space-y-6 p-8">
            <h1 className="text-5xl font-bold">Geleneksel Türk Kahvesi</h1>
            <p className="text-xl max-w-2xl mx-auto">
              40 yıllık hatırı olan eşsiz kahve deneyimi için sizi kahvemize bekliyoruz
            </p>
            <Link
              to="/menu"
              className="inline-block bg-[#D4A574] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2C1810] transition-colors"
            >
              Menüyü Görüntüle
            </Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Coffee className="w-12 h-12 mx-auto mb-4 text-[#D4A574]" />
          <h3 className="text-xl font-semibold mb-2">Premium Kahve</h3>
          <p className="text-gray-600">
            En kaliteli kahve çekirdekleri ile hazırlanan özel içecekler
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <Clock className="w-12 h-12 mx-auto mb-4 text-[#D4A574]" />
          <h3 className="text-xl font-semibold mb-2">Hızlı Servis</h3>
          <p className="text-gray-600">
            Siparişiniz en kısa sürede hazırlanıp size ulaştırılır
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <CreditCard className="w-12 h-12 mx-auto mb-4 text-[#D4A574]" />
          <h3 className="text-xl font-semibold mb-2">Kolay Ödeme</h3>
          <p className="text-gray-600">
            Kredi sistemi ile hızlı ve güvenli ödeme imkanı
          </p>
        </div>
      </section>

      <section className="bg-white rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1589985902809-39d25db22101?auto=format&fit=crop&q=80"
            alt="Café Interior"
            className="h-full w-full object-cover"
          />
          <div className="p-12 flex items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Hakkımızda</h2>
              <p className="text-gray-600 leading-relaxed">
                2024 yılından beri geleneksel Türk kahvesi kültürünü modern bir 
                yaklaşımla sunuyoruz. Özenle seçilmiş kahve çekirdekleri, 
                uzman baristalarımız ve özel pişirme tekniklerimiz ile 
                size unutulmaz bir kahve deneyimi yaşatıyoruz.
              </p>
              <Link
                to="/menu"
                className="inline-block bg-[#2C1810] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#D4A574] transition-colors"
              >
                Menümüzü Keşfedin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}