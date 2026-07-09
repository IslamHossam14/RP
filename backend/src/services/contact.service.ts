import prisma from '../config/database';
import { NotFoundError } from '../utils/errors';

export class ContactService {
  async createContact(data: any) {
    const contact = await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: 'NEW',
      },
    });

    return contact;
  }

  async getAllContacts(page: number, pageSize: number, status?: string, search?: string) {
    const skip = (page - 1) * pageSize;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { subject: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where: whereClause,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contact.count({ where: whereClause }),
    ]);

    return { contacts, total };
  }

  async getContactById(contactId: string) {
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      throw new NotFoundError('Contact not found');
    }

    return contact;
  }

  async updateContactStatus(contactId: string, status: string) {
    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: { status: status as any },
    });

    return contact;
  }

  async deleteContact(contactId: string) {
    await prisma.contact.delete({
      where: { id: contactId },
    });

    return { message: 'Contact deleted successfully' };
  }

  async getContactStats() {
    const [totalContacts, newContacts, viewedContacts, inProgressContacts, resolvedContacts] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.contact.count({ where: { status: 'VIEWED' } }),
      prisma.contact.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.contact.count({ where: { status: 'RESOLVED' } }),
    ]);

    return {
      total: totalContacts,
      new: newContacts,
      viewed: viewedContacts,
      inProgress: inProgressContacts,
      resolved: resolvedContacts,
    };
  }
}

export const contactService = new ContactService();
