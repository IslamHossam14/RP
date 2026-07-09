import prisma from '../src/config/database';
import { hashPassword } from '../src/utils/auth';

async function main() {
  console.log('Starting seed...');

  // Clear existing data
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.studioRequest.deleteMany();
  await prisma.studioService.deleteMany();
  await prisma.consultationBooking.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // Create super admin user
  const superAdminPassword = await hashPassword('admin123');
  const superAdmin = await prisma.user.create({
    data: {
      name: 'Super Admin',
      email: 'admin@gmail.com',
      phone: '966501234567',
      password: 'superAdminPassword',
      role: 'SUPER_ADMIN',
      specialization: 'Administration',
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  console.log('✓ Super Admin user created (admin@gmail.com : admin123)');

  // Create sample students
  const studentPassword = await hashPassword('Student123');
  const students = await Promise.all([
    prisma.user.create({
      data: {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '966501234567',
        password: studentPassword,
        role: 'STUDENT',
        specialization: 'تطوير ويب',
        status: 'ACTIVE',
      },
    }),
    prisma.user.create({
      data: {
        name: 'فاطمة علي',
        email: 'fatima@example.com',
        phone: '966502345678',
        password: studentPassword,
        role: 'STUDENT',
        specialization: 'تصميم جرافيكي',
        status: 'ACTIVE',
      },
    }),
    prisma.user.create({
      data: {
        name: 'محمود حسن',
        email: 'mahmoud@example.com',
        phone: '966503456789',
        password: studentPassword,
        role: 'INSTRUCTOR',
        specialization: 'تطوير ويب',
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('✓ Sample users created');

  // Create courses
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: 'دبلوم إدارة الأعمال',
        description: 'برنامج شامل في إدارة الأعمال والقيادة',
        price: 2500,
        duration: '6 أشهر',
        level: 'متقدم',
        category: 'DIPLOMA',
        content: ['أساسيات إدارة', 'استراتيجية', 'المشاريع', 'القيادة'],
        instructor: 'د. محمد علي',
        maxStudents: 50,
        status: 'ACTIVE',
      },
    }),
    prisma.course.create({
      data: {
        title: 'كورس التسويق الرقمي',
        description: 'تعلم أحدث استراتيجيات التسويق الرقمي',
        price: 800,
        duration: '3 أشهر',
        level: 'متوسط',
        category: 'COURSE',
        content: ['وسائل التواصل', 'البريد الإلكتروني', 'SEO', 'الإعلانات'],
        maxStudents: 100,
        status: 'ACTIVE',
      },
    }),
    prisma.course.create({
      data: {
        title: 'دبلوم تكنولوجيا المعلومات',
        description: 'برنامج متخصص في تقنيات البرمجة والويب',
        price: 3000,
        duration: '9 أشهر',
        level: 'متقدم',
        category: 'DIPLOMA',
        content: ['البرمجة', 'الويب', 'قواعد البيانات', 'الأمن'],
        instructor: 'م. أحمد محمود',
        maxStudents: 40,
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('✓ Sample courses created');

  // Create registrations
  await Promise.all([
    prisma.registration.create({
      data: {
        userId: students[0].id,
        courseId: courses[0].id,
        status: 'APPROVED',
        progress: 50,
      },
    }),
    prisma.registration.create({
      data: {
        userId: students[1].id,
        courseId: courses[1].id,
        status: 'PENDING',
      },
    }),
  ]);

  console.log('✓ Sample registrations created');

  // Create consultations
  const consultations = await Promise.all([
    prisma.consultation.create({
      data: {
        title: 'الاستشارات النفسية',
        type: 'PSYCHOLOGICAL',
        description: 'استشارات نفسية متخصصة من معالجين معتمدين',
        price: 300,
        duration: 60,
        specialist: 'د. فاطمة أحمد',
        specialization: 'استشارات نفسية',
        experience: '12 سنة خبرة',
      },
    }),
    prisma.consultation.create({
      data: {
        title: 'الاستشارات القانونية',
        type: 'LEGAL',
        description: 'استشارات قانونية متخصصة من محامين معتمدين',
        price: 500,
        duration: 60,
        specialist: 'أ. محمد علي',
        specialization: 'استشارات قانونية',
        experience: '15 سنة خبرة',
      },
    }),
  ]);

  console.log('✓ Sample consultations created');

  // Create studio services
  const studioServices = await Promise.all([
    prisma.studioService.create({
      data: {
        title: 'تصوير المحتوى',
        type: 'VIDEO_PRODUCTION',
        description: 'تصوير احترافي للمحتوى التعليمي',
        features: ['كاميرات 4K', 'إضاءة متقدمة', 'مونتاج احترافي'],
        basePrice: 2000,
      },
    }),
    prisma.studioService.create({
      data: {
        title: 'التسجيل الصوتي',
        type: 'AUDIO_RECORDING',
        description: 'تسجيل صوتي عالي الجودة',
        features: ['ميكروفونات احترافية', 'كبينة عزل صوت'],
        basePrice: 500,
      },
    }),
  ]);

  console.log('✓ Sample studio services created');

  // Create events
  const now = new Date();
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  await Promise.all([
    prisma.event.create({
      data: {
        title: 'مؤتمر التطوير الرقمي',
        description: 'مؤتمر سنوي عن آخر تطورات التكنولوجيا',
        type: 'CONFERENCE',
        startDate: nextMonth,
        endDate: new Date(nextMonth.getTime() + 2 * 24 * 60 * 60 * 1000),
        location: 'الرياض - فندق الفيصلية',
        capacity: 500,
        price: 0,
        status: 'UPCOMING',
      },
    }),
    prisma.event.create({
      data: {
        title: 'ورشة عمل في البرمجة',
        description: 'ورشة عمل عملية في تطوير الويب',
        type: 'WORKSHOP',
        startDate: new Date(nextMonth.getTime() + 7 * 24 * 60 * 60 * 1000),
        endDate: new Date(nextMonth.getTime() + 9 * 24 * 60 * 60 * 1000),
        location: 'جدة - مركز التدريب',
        capacity: 50,
        price: 299,
        status: 'UPCOMING',
      },
    }),
  ]);

  console.log('✓ Sample events created');

  console.log('✓ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
