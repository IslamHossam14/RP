import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';

export class StudioService {
  async getAllServices(page: number, pageSize: number, type?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = { status: 'ACTIVE' };
    if (type) {
      whereClause.type = type;
    }

    const [services, total] = await Promise.all([
      prisma.studioService.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.studioService.count({ where: whereClause }),
    ]);

    return { services, total };
  }

  async getServiceById(serviceId: string) {
    const service = await prisma.studioService.findUnique({
      where: { id: serviceId },
      include: {
        requests: {
          select: {
            id: true,
            userId: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    return service;
  }

  async createService(data: any) {
    const service = await prisma.studioService.create({
      data: {
        title: data.title,
        type: data.type,
        description: data.description,
        features: data.features,
        basePrice: data.basePrice,
      },
    });

    return service;
  }

  async updateService(serviceId: string, data: any) {
    const service = await prisma.studioService.update({
      where: { id: serviceId },
      data: {
        title: data.title,
        description: data.description,
        features: data.features,
        basePrice: data.basePrice,
      },
    });

    return service;
  }

  async createStudioRequest(userId: string, data: any) {
    // Verify user and service exist
    const [user, service] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.studioService.findUnique({ where: { id: data.serviceId } }),
    ]);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    const request = await prisma.studioRequest.create({
      data: {
        userId,
        serviceId: data.serviceId,
        title: data.title,
        description: data.description,
        budget: data.budget,
        deadline: data.deadline ? new Date(data.deadline) : undefined,
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
        service: {
          select: {
            id: true,
            title: true,
            basePrice: true,
          },
        },
      },
    });

    return request;
  }

  async getAllRequests(page: number, pageSize: number, status?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const [requests, total] = await Promise.all([
      prisma.studioRequest.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          service: {
            select: {
              id: true,
              title: true,
              basePrice: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.studioRequest.count({ where: whereClause }),
    ]);

    return { requests, total };
  }

  async getUserRequests(userId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [requests, total] = await Promise.all([
      prisma.studioRequest.findMany({
        where: { userId },
        include: {
          service: {
            select: {
              id: true,
              title: true,
              basePrice: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.studioRequest.count({ where: { userId } }),
    ]);

    return { requests, total };
  }

  async updateRequestStatus(requestId: string, status: string) {
    const request = await prisma.studioRequest.update({
      where: { id: requestId },
      data: { status: status as any },
    });

    return request;
  }

  async getRequestById(requestId: string) {
    const request = await prisma.studioRequest.findUnique({
      where: { id: requestId },
      include: {
        user: true,
        service: true,
      },
    });

    if (!request) {
      throw new NotFoundError('Request not found');
    }

    return request;
  }
}

export const studioService = new StudioService();
