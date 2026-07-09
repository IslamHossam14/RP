import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';

export class UserService {
  async getAllUsers(page: number, pageSize: number, search?: string, role?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (role) {
      whereClause.role = role;
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          specialization: true,
          status: true,
          createdAt: true,
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: whereClause }),
    ]);

    return { users, total };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: true,
        specialization: true,
        bio: true,
        status: true,
        createdAt: true,
        registrations: {
          select: {
            id: true,
            course: {
              select: { id: true, title: true, price: true },
            },
            status: true,
            enrollmentDate: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  async updateUser(userId: string, data: any) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        specialization: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async updateUserStatus(userId: string, status: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { status: status as any },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    });

    return user;
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'User deleted successfully' };
  }

  async getUserStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const [registrations, payments, consultations] = await Promise.all([
      prisma.registration.count({ where: { userId } }),
      prisma.payment.count({ where: { userId, status: 'COMPLETED' } }),
      prisma.consultationBooking.count({ where: { userId } }),
    ]);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      stats: {
        enrolledCourses: registrations,
        completedPayments: payments,
        consultationBookings: consultations,
      },
    };
  }
}

export const userService = new UserService();
