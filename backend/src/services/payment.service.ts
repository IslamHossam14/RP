import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';
import { CreatePaymentInput } from '../validators';

export class PaymentService {
  async getAllPayments(page: number, pageSize: number, search?: string, status?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { course: { title: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (status) {
      whereClause.status = status;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { paymentDate: 'desc' },
      }),
      prisma.payment.count({ where: whereClause }),
    ]);

    return { payments, total };
  }

  async getPaymentById(paymentId: string) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: true,
        course: true,
      },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    return payment;
  }

  async createPayment(userId: string, data: CreatePaymentInput) {
    // Verify user and course exist
    const [user, course] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.course.findUnique({ where: { id: data.courseId } }),
    ]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        courseId: data.courseId,
        amount: course.price,
        paymentMethod: data.paymentMethod as any,
        status: 'PENDING',
        transactionId: `TXN${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            price: true,
          },
        },
      },
    });

    return payment;
  }

  async updatePaymentStatus(paymentId: string, status: string) {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: status as any,
        paymentDate: status === 'COMPLETED' ? new Date() : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return payment;
  }

  async completePayment(paymentId: string, transactionId: string) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: 'COMPLETED',
        paymentDate: new Date(),
        transactionId: transactionId || payment.transactionId,
      },
    });

    // Auto-approve the corresponding registration
    const registration = await prisma.registration.findFirst({
      where: {
        userId: payment.userId,
        courseId: payment.courseId,
      },
    });

    if (registration && registration.status === 'PENDING') {
      await prisma.registration.update({
        where: { id: registration.id },
        data: { status: 'APPROVED' },
      });
    }

    return updatedPayment;
  }

  async refundPayment(paymentId: string) {
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'REFUNDED' },
    });

    return payment;
  }

  async getUserPayments(userId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              price: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { paymentDate: 'desc' },
      }),
      prisma.payment.count({ where: { userId } }),
    ]);

    return { payments, total };
  }

  async getPaymentStats() {
    const [totalPayments, completedPayments, pendingPayments, failedPayments] = await Promise.all([
      prisma.payment.count(),
      prisma.payment.count({ where: { status: 'COMPLETED' } }),
      prisma.payment.count({ where: { status: 'PENDING' } }),
      prisma.payment.count({ where: { status: 'FAILED' } }),
    ]);

    const totalRevenue = await prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    });

    return {
      totalPayments,
      completedPayments,
      pendingPayments,
      failedPayments,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  }
}

export const paymentService = new PaymentService();
