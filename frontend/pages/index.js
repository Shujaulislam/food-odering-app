
export default function Home() {
  return (
    <div>
      <div className="hero bg-cover bg-center text-black p-10 text-center" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
        <h1 className="text-5xl font-bold">Delicious Meals at Your Fingertips</h1>
        <p className="text-xl mt-2">Explore, Order, Enjoy!</p>
        <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300">Get Started</button>
      </div>
      <div className="features grid grid-cols-3 gap-4 p-4">
    <div className="feature-item glass text-center">
      <img src="/feature-1.png" alt="Feature 1" className="w-20 h-20 mx-auto"/>
      <h3 className="text-black text-xl font-bold mt-2">Instant Ordering</h3>
      <p className="text-black">Choose your favorite meals and order instantly from your phone.</p>
    </div>
    <div className="feature-item glass text-center">
      <img src="/feature-2.png" alt="Feature 2" className="w-20 h-20 mx-auto"/>
      <h3 className="text-black text-xl font-bold mt-2">Real-time Tracking</h3>
      <p className="text-black">Track your order in real-time from the kitchen to your doorstep.</p>
    </div>
    <div className="feature-item glass text-center">
      <img src="/feature-3.png" alt="Feature 3" className="w-20 h-20 mx-auto"/>
      <h3 className="text-black text-xl font-bold mt-2">Exclusive Offers</h3>
      <p className="text-black">Enjoy exclusive deals and discounts only available to our app users.</p>
    </div>
  </div>

  <div className="testimonials glass slider p-4">
    <div className="testimonial-item text-center">
      <p>"The best food ordering experience I've ever had. So easy and quick!"</p>
      <cite>- Jane Doe</cite>
    </div>
    <div className="testimonial-item text-center">
      <p>"Incredible app with outstanding customer service. Highly recommend!"</p>
      <cite>- John Smith</cite>
    </div>
  </div>

  <div className="cta text-center p-4 glass bg-green-600 text-white">
    <h2 className="text-3xl font-bold">Ready to Order?</h2>
    <p>Join us and enjoy the best food from local restaurants.</p>
        <button className="mt-4 px-6 py-2 bg-white text-green-600 rounded-lg hover:bg-gray-200 transition duration-300">Sign Up Now</button>
      </div>
      // Additional sections like "How It Works" or "Most Popular" can be added here
    </div>
  );
}
