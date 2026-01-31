"use client"

import { CategoryTile } from "@/components/category-tile"
import { Button } from "@/components/ui/button"
import { Play, User, Star, Check } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function HomePage() {
  const categories = [
    {
      id: "beginner-men",
      title: "Beginner Program - Men",
      subtitle: "30-Day Challenge",
      image: "/man-doing-push-ups-fitness-beginner.jpg",
    },
    {
      id: "beginner-women",
      title: "Beginner Program - Women",
      subtitle: "30-Day Challenge",
      image: "/woman-doing-yoga-fitness-beginner.jpg",
    },
    {
      id: "equipment-men",
      title: "With Equipment - Men",
      subtitle: "Dumbbell Workouts",
      image: "/man-lifting-dumbbells-gym.jpg",
    },
    {
      id: "equipment-women",
      title: "With Equipment - Women",
      subtitle: "Dumbbell Workouts",
      image: "/woman-with-dumbbells-gym.jpg",
    },
  ]

  const targetedWorkouts = [
    {
      id: "belly",
      title: "Belly Fat Burn",
      image: "/abs-workout-core-training.jpg",
    },
    {
      id: "arms",
      title: "Arm Toning",
      image: "/arm-exercises-biceps-triceps.jpg",
    },
    {
      id: "glutes",
      title: "Glute Sculpting",
      image: "/glute-workout-squats.jpg",
    },
    {
      id: "chest",
      title: "Chest Builder",
      image: "/chest-workout-push-ups.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo variant="light" size="md" href="/" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/nigerian-people-working-out-gym-fitness.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">Get Stronger in 30 Days</h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
            Short, effective workout videos designed for busy Nigerians. Just 30 seconds per video, transform your
            fitness journey today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/auth/register">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg">
                <Play className="w-6 h-6 mr-2 fill-current" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="#intro-video">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent h-14 px-8 text-lg"
              >
                Watch Intro
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/80">Active Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Workout Videos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30sec</div>
              <div className="text-primary-foreground/80">Per Video</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.8★</div>
              <div className="text-primary-foreground/80">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Video Section */}
      <section id="intro-video" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-foreground">How Strong in 30 Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch this quick introduction to see how our platform can help you achieve your fitness goals in just 30
                days
              </p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary shadow-2xl group cursor-pointer">
              <video controls poster="/fitness-app-introduction-welcome-screen.jpg" className="w-full h-full">
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Beginner Programs */}
      <section id="programs" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Beginner Programs</h2>
          <p className="text-muted-foreground mb-8">Perfect for starting your fitness journey</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.slice(0, 2).map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <CategoryTile {...category} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* With Equipment Programs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-foreground">With Equipment</h2>
          <p className="text-muted-foreground mb-8">Level up with dumbbell workouts</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.slice(2, 4).map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <CategoryTile {...category} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Targeted Workouts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Targeted Workouts</h2>
          <p className="text-muted-foreground mb-8">Focus on specific muscle groups</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {targetedWorkouts.map((workout) => (
              <Link key={workout.id} href={`/category/${workout.id}`}>
                <CategoryTile title={workout.title} image={workout.image} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Success Stories</h2>
            <p className="text-lg text-muted-foreground">See what our members are saying</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4">
                "Strong in 30 changed my life! The short videos made it so easy to stay consistent. I lost 15kg in 3
                months!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/nigerian-woman-smiling-fitness.jpg"
                  alt="Testimonial"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">Chioma Adeleke</div>
                  <div className="text-sm text-muted-foreground">Lagos, Nigeria</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4">
                "As a busy professional, I needed quick workouts. These 30-second videos are perfect for my lunch
                breaks!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/nigerian-man-smiling-professional.jpg"
                  alt="Testimonial"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">Emeka Okonkwo</div>
                  <div className="text-sm text-muted-foreground">Abuja, Nigeria</div>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-4">
                "The beginner program was exactly what I needed. Clear instructions and motivating content. Highly
                recommend!"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/nigerian-woman-fitness-happy.jpg"
                  alt="Testimonial"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">Aisha Mohammed</div>
                  <div className="text-sm text-muted-foreground">Kano, Nigeria</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthy Recipes */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-foreground">Healthy Recipes</h2>
          <p className="text-muted-foreground mb-8">Fuel your fitness with nutritious meals</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/category/recipes">
              <CategoryTile
                title="Quick Nigerian Recipes"
                subtitle="Under 30 minutes"
                image="/healthy-nigerian-food-jollof-rice.jpg"
              />
            </Link>
            <Link href="/category/recipes">
              <CategoryTile
                title="Protein-Packed Meals"
                subtitle="Build muscle"
                image="/protein-meal-chicken-vegetables.jpg"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerians transforming their bodies with Strong in 30
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                Start Your Free Trial
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <Check className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <Logo size="md" href="/" />
              </div>
              <p className="text-sm text-secondary-foreground/70">
                Transform your body with Nigeria's premier fitness platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Programs</h3>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>
                  <Link href="/category/beginner-men" className="hover:text-primary">
                    Beginner Men
                  </Link>
                </li>
                <li>
                  <Link href="/category/beginner-women" className="hover:text-primary">
                    Beginner Women
                  </Link>
                </li>
                <li>
                  <Link href="/category/equipment-men" className="hover:text-primary">
                    With Equipment
                  </Link>
                </li>
                <li>
                  <Link href="/category/recipes" className="hover:text-primary">
                    Recipes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/70">
            © 2025 Strong in 30. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
