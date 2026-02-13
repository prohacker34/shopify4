import { ShoppingBag, Users, Globe, Award } from 'lucide-react';

export default function  About() {
  const stats = [
    { label: 'Products', value: '10,000+' },
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Countries', value: '25+' },
    { label: 'Team Members', value: '100+' },
  ];

  const values = [
    {
      icon: ShoppingBag,
      title: 'Quality Products',
      description:
        'We carefully curate every product to ensure the highest quality and value for our customers.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description:
        'Your satisfaction is our priority. We provide exceptional service and support at every step.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description:
        'We ship worldwide, bringing quality products to customers across the globe.',
    },
    {
      icon: Award,
      title: 'Trusted Brand',
      description:
        'Years of experience and thousands of happy customers make us a trusted choice.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6">About Our Store</h1>
              <p className="text-slate-600 mb-6">
                Founded with a passion for quality and customer satisfaction, we've been serving customers worldwide since 2015.
                Our mission is to provide exceptional products that enhance your lifestyle while delivering an unparalleled shopping experience.
              </p>
              <p className="text-slate-600">
                We believe in building lasting relationships with our customers through trust, transparency, and dedication to excellence.
                Every product we offer is carefully selected to meet our high standards of quality and value.
              </p>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2NTM1NDcyMnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape the way we serve our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">Behind the Scenes</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Take a look at our operations and the dedicated team that makes it all possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Warehouse */}
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Our warehouse"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white">Our Warehouse</h3>
                <p className="text-white/90">State-of-the-art fulfillment center</p>
              </div>
            </div>

            {/* Customer Support */}
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Customer service"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white">Customer Support</h3>
                <p className="text-white/90">Always here to help you</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white mb-4">Ready to Start Shopping?</h2>
          <p className="text-slate-300 mb-8">
            Join thousands of satisfied customers and discover quality products at great prices.
          </p>
          <button className="bg-white text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-100 transition-colors">
            Browse Products
          </button>
        </div>
      </section>
    </div>
  );
}
