import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';

export class ConsultationService {
  async getAllConsultations(page: number, pageSize: number, type?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = { available: true };
    if (type) {
      whereClause.type = type;
    }

    const [consultations, total] = await Promise.all([
      prisma.consultation.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.consultation.count({ where: whereClause }),
    ]);

    return { consultations, total };
  }

  async getConsultationById(consultationId: string) {
    const consultation = await prisma.consultation.findUnique({
      where: { id: consultationId },
      include: {
        bookings: {
          select: {
            id: true,
            userId: true,
            date: true,
            time: true,
            status: true,
          },
        },
      },
    });

    if (!consultation) {
      throw new NotFoundError('Consultation not found');
    }

    return consultation;
  }

  async createConsultation(data: any) {
    const consultation = await prisma.consultation.create({
      data: {
        title: data.title,
        type: data.type,
        description: data.description,
        price: data.price,
        duration: data.duration || 60,
        specialist: data.specialist,
        specialization: data.specialization,
        experience: data.experience,
      },
    });

    return consultation;
  }

  async bookConsultation(userId: string, consultationId: string, date: string, time: string) {
    // Verify user and consultation exist
    const [user, consultation] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.consultation.findUnique({ where: { id: consultationId } }),
    ]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!consultation) {
      throw new NotFoundError('Consultation not found');
    }

    // Check if slot is already booked
    const existingBooking = await prisma.consultationBooking.findFirst({
      where: {
        consultationId,
        date: new Date(date),
        time,
      },
    });

    if (existingBooking) {
      throw new ConflictError('This time slot is already booked');
    }

    const booking = await prisma.consultationBooking.create({
      data: {
        userId,
        consultationId,
        date: new Date(date),
        time,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        consultation: {
          select: {
            id: true,
            title: true,
            specialist: true,
            price: true,
          },
        },
      },
    });

    return booking;
  }

  async updateBookingStatus(bookingId: string, status: string) {
    const booking = await prisma.consultationBooking.update({
      where: { id: bookingId },
      data: { status: status as any },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        consultation: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return booking;
  }

  async getUserBookings(userId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [bookings, total] = await Promise.all([
      prisma.consultationBooking.findMany({
        where: { userId },
        include: {
          consultation: {
            select: {
              id: true,
              title: true,
              specialist: true,
              specialization: true,
              price: true,
              duration: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { date: 'desc' },
      }),
      prisma.consultationBooking.count({ where: { userId } }),
    ]);

    return { bookings, total };
  }

  async getAllBookings(page: number, pageSize: number, status?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [bookings, total] = await Promise.all([
      prisma.consultationBooking.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          consultation: {
            select: {
              id: true,
              title: true,
              specialist: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { date: 'desc' },
      }),
      prisma.consultationBooking.count({ where: whereClause }),
    ]);

    return { bookings, total };
  }

  async cancelBooking(bookingId: string) {
    const booking = await prisma.consultationBooking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });

    return booking;
  }
}

export const consultationService = new ConsultationService();
