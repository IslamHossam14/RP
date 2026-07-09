import prisma from '../config/database';
import { NotFoundError, ConflictError } from '../utils/errors';

export class EventService {
  async getAllEvents(page: number, pageSize: number, type?: string, status?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (type) {
      whereClause.type = type;
    }
    if (status) {
      whereClause.status = status;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: { startDate: 'desc' },
      }),
      prisma.event.count({ where: whereClause }),
    ]);

    return { events, total };
  }

  async getEventById(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        registrations: {
          select: {
            id: true,
            userId: true,
            attendeeCount: true,
            status: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    return event;
  }

  async createEvent(data: any) {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        capacity: data.capacity,
        price: data.price || 0,
        image: data.image,
      },
    });

    return event;
  }

  async updateEvent(eventId: string, data: any) {
    const event = await prisma.event.update({
      where: { id: eventId },
      data: {
        title: data.title,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        location: data.location,
        capacity: data.capacity,
        price: data.price,
        image: data.image,
      },
    });

    return event;
  }

  async registerForEvent(userId: string, eventId: string, attendeeCount: number = 1) {
    // Verify user and event exist
    const [user, event] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.event.findUnique({ where: { id: eventId } }),
    ]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: {
        userId,
        eventId,
      },
    });

    if (existingRegistration) {
      throw new ConflictError('User is already registered for this event');
    }

    // Check capacity
    const registrationCount = await prisma.eventRegistration.count({
      where: { eventId },
    });

    if (registrationCount >= event.capacity) {
      throw new ConflictError('Event is at full capacity');
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        userId,
        eventId,
        attendeeCount,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            startDate: true,
            location: true,
          },
        },
      },
    });

    return registration;
  }

  async getUserEventRegistrations(userId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [registrations, total] = await Promise.all([
      prisma.eventRegistration.findMany({
        where: { userId },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              startDate: true,
              endDate: true,
              location: true,
              price: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.eventRegistration.count({ where: { userId } }),
    ]);

    return { registrations, total };
  }

  async getAllEventRegistrations(page: number, pageSize: number, status?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [registrations, total] = await Promise.all([
      prisma.eventRegistration.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          event: {
            select: {
              id: true,
              title: true,
              startDate: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.eventRegistration.count({ where: whereClause }),
    ]);

    return { registrations, total };
  }

  async updateEventRegistrationStatus(registrationId: string, status: string) {
    const registration = await prisma.eventRegistration.update({
      where: { id: registrationId },
      data: { status: status as any },
    });

    return registration;
  }

  async getUpcomingEvents(limit: number = 5) {
    const now = new Date();
    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: now,
        },
      },
      take: limit,
      orderBy: { startDate: 'asc' },
    });

    return events;
  }

  async getEventStats(eventId: string) {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundError('Event not found');
    }

    const [totalRegistrations, approvedRegistrations, totalAttendees] = await Promise.all([
      prisma.eventRegistration.count({ where: { eventId } }),
      prisma.eventRegistration.count({
        where: { eventId, status: 'APPROVED' },
      }),
      prisma.eventRegistration.aggregate({
        where: { eventId },
        _sum: { attendeeCount: true },
      }),
    ]);

    return {
      event: {
        id: event.id,
        title: event.title,
        capacity: event.capacity,
      },
      stats: {
        totalRegistrations,
        approvedRegistrations,
        totalAttendees: totalAttendees._sum.attendeeCount || 0,
        capacityUsed: ((totalRegistrations / event.capacity) * 100).toFixed(2) + '%',
      },
    };
  }
}

export const eventService = new EventService();
