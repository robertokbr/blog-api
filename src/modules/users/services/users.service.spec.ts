import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../repositories/users.repository';
import { UsersService } from './users.service';
import { UserDto } from '../dto/user.dto';

describe('UsersService', () => {
  let service: UsersService;

  const createUserDto = {
    email: 'jhondoe@email.com',
    name: 'jhon doe',
    github: 'jhon',
    image: 'jhon.png',
  };

  const mockUser = {
    id: 1,
  } as UserDto;

  const mockUsersRepository = {
    create: jest.fn((_createUserDto) => Promise.resolve(mockUser)),
    findAll: jest.fn((_query) => Promise.resolve([mockUser])),
    findByEmail: jest.fn((_email) => Promise.resolve(mockUser)),
    update: jest.fn((_id, _updateUserDto, _user) => Promise.resolve(mockUser)),
    delete: jest.fn((_id) => Promise.resolve(mockUser)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crreate', () => {
    it('it shoud be able to create a user', async () => {
      const user = await service.findOrCreate(createUserDto);

      expect(user).toEqual(mockUser);
      expect(mockUsersRepository.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should be able to find all user by query', async () => {
      const users = await service.findAll({
        name: 'jhon doe',
      });

      expect(users).toEqual([mockUser]);
      expect(mockUsersRepository.findAll).toHaveBeenCalledWith({
        name: 'jhon doe',
      });
    });
  });

  describe('findOne', () => {
    it('should be able to find one user by email', async () => {
      const user = await service.findOne('jhondoe@email.com');

      expect(user).toEqual(mockUser);
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        'jhondoe@email.com',
      );
    });
  });

  describe('update', () => {
    it('should be able to update a user', async () => {
      const updatedUser = await service.update(
        1,
        { name: 'jon snow' },
        mockUser,
      );

      expect(updatedUser).toEqual(mockUser);
      expect(mockUsersRepository.update).toHaveBeenCalledWith(1, {
        name: 'jon snow',
      });
    });

    it('should not be able to update a user', async () => {
      await expect(
        service.update(2, { name: 'jon snow' }, mockUser),
      ).rejects.toThrowError("You're only able to update your own user");
    });
  });

  describe('delete', () => {
    it('should be able to delete a user', async () => {
      const user = await service.delete(1);

      expect(user).toEqual(mockUser);
      expect(mockUsersRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
